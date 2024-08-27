import { LogIn } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { type FunctionComponent } from "react";

import { Button } from "~/components/ui/button";

import AvatarIcon from "../avatar";
import DropDown from "../dropdown";

const AuthButton: FunctionComponent<{ inDashboard?: boolean }> = ({
  inDashboard = false,
}) => {
  const { data: session } = useSession();

  return (
    <div className="hidden gap-2 sm:flex">
      <div className="sm:flex md:flex">
        {/* {!inDashboard && session?.user.role === "ADMIN" && (
        <Button asChild size='sm'>
          <Link href="/dashboard/admin">Dashboard</Link>
        </Button>
      )}
      {!inDashboard && session?.user.role === "ORGANISER" && (
        <Button asChild size='sm'>
          <Link href="/dashboard/organiser">Dashboard</Link>
        </Button>
      )} */}
      </div>
      {session ? (
        <>
          <Link href="/profile">
            <DropDown
              trigger={
                <AvatarIcon
                  src={session.user?.image ?? "https://github.com/shadcn.png"}
                />
              }
            />
          </Link>
        </>
      ) : (
        <Button asChild size="sm">
          <Link href="/login">
            <LogIn size={18} className="mr-2" /> Login
          </Link>
        </Button>
      )}
    </div>
  );
};

export default AuthButton;
