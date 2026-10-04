"use server";

import { auth } from "@/lib/auth";
import { getOrganizationById } from "@/lib/safe-action";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getSession = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return session;
});

export const getSessionOrRedirect = cache(async () => {
  const session = await getSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return session;
});

export const getUser = cache(async () => {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return session.user;
});

export const getUserOrRedirect = cache(async () => {
  const session = await getSessionOrRedirect();

  return session.user;
});

/**
 * This function retrieves the organization associated with the current session.
 * If the session is not valid or the organization cannot be found, it redirects
 * the user to the appropriate page.
 *
 * It useful in server components, for server actions please use lib/safe-action.ts
 *
 * @returns {Promise<Organization>} The organization associated with the current session.
 * @throws {Redirect} If the session is invalid or the organization cannot be found.
 */
export const getOrganizationOrRedirect = cache(async () => {
  const session = await getSessionOrRedirect();

  const organizationId = session.session.activeOrganizationId;

  const organization = await getOrganizationById(organizationId);

  return organization;
});
