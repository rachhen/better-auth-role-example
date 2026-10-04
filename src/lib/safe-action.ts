import { betterAuth } from "@next-safe-action/adapter-better-auth";
import { EvlogError } from "evlog";
import { createMiddleware, createSafeActionClient } from "next-safe-action";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

import { auth } from "./auth";
import { hasPermission } from "./authorized";
import { createError, log } from "./evlog";
import { type OrganizationStatements } from "./organization-access";

export const actionClient = createSafeActionClient({
  defaultValidationErrorsShape: "flattened",
  defineMetadataSchema: () => {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError: (err, utils) => {
    const actionName = utils.metadata.actionName || "unknown-action";
    // const ctx = utils.ctx as Record<string, unknown>;

    // Expected user-facing errors — surface to client, skip Sentry
    if (err instanceof EvlogError) {
      return {
        message: err.message,
        code: err.code,
        status: err.status,
        why: err.why,
        fix: err.fix,
        link: err.link,
        cause: err.cause,
      };
    }

    // Unexpected errors — send to Sentry
    // Sentry.captureException(err, (scope) => {
    //   scope.setContext("serverError", { message: err.message });
    //   scope.setContext("metadata", utils.metadata);
    //   scope.setContext("clientInput", {
    //     data: utils.clientInput,
    //   });
    //   scope.setTag("actionName", actionName);

    //   const authCtx = "auth" in ctx ? (ctx.auth as Session) : undefined;
    //   if (authCtx?.session) {
    //     scope.setExtras({ session: authCtx.session });
    //   }

    //   return scope;
    // });

    log.error({ actionName, error: err.message });

    return {
      message: "An unexpected error occurred. Please try again later.",
      code: "UNKNOWN_ERROR",
    };
  },
});

export const authClient = actionClient.use(
  betterAuth(auth, {
    authorize: ({ authData, next }) => {
      if (!authData) {
        redirect("/auth/sign-in");
      }

      return next({ ctx: { auth: authData } });
    },
  }),
);

export const organizationClient = authClient.use(async ({ next, ctx }) => {
  const organization = await getOrganizationById(
    ctx.auth.session.activeOrganizationId,
  );

  return next({ ctx: { ...ctx, organization } });
});

export const getOrganizationById = async (
  organizationId: string | undefined | null,
) => {
  if (!organizationId) {
    redirect("/settings/organizations");
  }

  const organization = await auth.api.getOrganization({
    headers: await headers(),
    query: { organizationId },
  });

  if (!organization) {
    redirect("/settings/organizations");
  }

  return organization;
};

type OrganizationCtx = Awaited<ReturnType<typeof getOrganizationById>>;

export const can = (permissions: {
  [K in keyof OrganizationStatements]?: OrganizationStatements[K][number][];
}) =>
  createMiddleware<{ ctx: { organization: OrganizationCtx } }>().define(
    async ({ next, ctx }) => {
      const result = await hasPermission(permissions, ctx.organization.id);

      if (!result) {
        throw createError({
          status: 403,
          code: "FORBIDDEN",
          message: "You do not have permission to perform this action.",
          why: "The user does not have the required permissions to perform this action.",
          fix: "Please contact your organization administrator to request access.",
        });
      }

      return next();
    },
  );
can({ project: ["create"] });
