import type { Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";

export async function findEventIfExistById(eventId: string) {
  const existingEvent = await db.event.findUnique({
    where: { id: eventId },
  });

  if (!existingEvent) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Event not found",
    });
  }

  return existingEvent;
}

export async function findTemplateAndCheckQuestions(templateId: string) {
  const template = await db.feedbackTemplate.findUnique({
    where: { id: templateId },
    include: { Questions: true },
  });

  if (!template) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "FeedbackTemplate not found",
    });
  }

  if (template.Questions.length === 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "FeedbackTemplate cannot be published without questions",
    });
  }

  return template;
}

export const checkOrganiser = async (
  userId: string,
  eventId: string,
  role: Role,
) => {
  const organiser = await db.organiser.findFirst({
    where: {
      userId,
      eventId,
    },
  });

  if (!organiser || role !== "ADMIN") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "User is not an organiser for this event",
    });
  }
};
