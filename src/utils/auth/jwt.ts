import { type RefreshToken, type VerificationToken } from "@prisma/client";
import { error } from "console";
import jwt from "jsonwebtoken";
import { db } from "~/server/db";
import { RefreshTokenSchema } from "~/zod/authZ";
import { hashToken } from "./hashToken";
import { getUserById } from "./auth";
import { v4 as uuidv4 } from "uuid";
import { addRefreshTokenToWhitelist } from "~/services/auth.service";

const AUTH_SECRET = process.env.AUTH_SECRET as string;

const secrets = {
  JWT_VERIFICATION_SECRET: AUTH_SECRET + "verification",
  JWT_ACCESS_SECRET: AUTH_SECRET + "access",
  JWT_REFRESH_SECRET: AUTH_SECRET + "verify",
};

const generateAccessToken = (user: { id: string }) => {
  return jwt.sign({ userId: user.id }, secrets.JWT_ACCESS_SECRET as string, {
    expiresIn: "5h",
  });
};

export function generateRefreshToken(user: { id: string }, jti: string) {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    secrets.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "7d",
    },
  );
}

const generateVerificationToken = (
  user: { id: string },
  jti: string,
): string => {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },

    secrets.JWT_VERIFICATION_SECRET,
    {
      expiresIn: "1d",
    },
  ) as string;
};

const findVerificationTokenById = async (
  id: string,
): Promise<VerificationToken | null> => {
  return await db.verificationToken.findUnique({
    where: {
      id,
    },
  });
};

const findRefreshTokenById = async (
  id: string,
): Promise<RefreshToken | null> => {
  return await db.refreshToken.findUnique({
    where: {
      id,
    },
  });
};

const getRefreshTokenExpiry = (token: string) => {
  const decoded = jwt.decode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  if (decoded && typeof decoded === "object") {
    const decodedToken: jwt.JwtPayload = decoded;
    if (decodedToken?.exp) {
      const adjustedExpiry = decoded["exp"] || 0;
      // console.log("Refresh :", (adjustedExpiry - currentTime).toLocaleString());
      return adjustedExpiry;
    }
  }
  return 0;
};

const isJwtExpired = (token: string) => {
  const currentTime = Math.floor(Date.now() / 1000) + 60;
  const decoded = jwt.decode(token);

  if (decoded && typeof decoded === "object") {
    const decodedToken: jwt.JwtPayload = decoded;
    if (decodedToken?.exp) {
      const adjustedExpiry = decoded["exp"] || 0;
      if (adjustedExpiry < currentTime) {
        return true;
      }
      return false;
    }
  }

  return true;
};

const revokeRefreshToken = async (id: string) => {
  return await db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
};

const generateTokens = (user: { id: string }, jti: string) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  try {
    const validateFields = RefreshTokenSchema.safeParse({
      refreshToken: token,
    });
    if (!validateFields.success) {
      console.error(validateFields.error);
      throw validateFields.error;
    }
    const { refreshToken } = validateFields.data;

    const payload = jwt.verify(
      refreshToken,
      secrets.JWT_REFRESH_SECRET as string,
    ) as any;
    const savedRefreshedToken = await findRefreshTokenById(
      payload.jti as string,
    );
    if (!savedRefreshedToken || savedRefreshedToken.revoked == true) {
      console.error("Invalid token");
      throw error("Invalid token");
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshedToken.hashedToken) {
      console.error("Unauthorized");
      throw error("Unauthorized");
    }

    const user = await getUserById(payload.userId as string);
    if (!user) {
      console.error("Unauthorized");
      throw error("Unauthorized");
    }

    await revokeRefreshToken(savedRefreshedToken.id);

    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti,
    );

    await addRefreshTokenToWhitelist({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export {
  secrets,
  generateVerificationToken,
  findVerificationTokenById,
  generateTokens,
  getRefreshTokenExpiry,
  isJwtExpired,
  findRefreshTokenById,
  revokeRefreshToken,
  refreshToken,
};
