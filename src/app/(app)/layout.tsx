import { auth } from "@/lib/auth";
import { getQueryClient } from "@/lib/query-client";
import { ensureSessionServer } from "@better-auth-ui/core/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

async function Layout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  const session = await ensureSessionServer(queryClient, auth, {
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in?redirectTo=/dashboard");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}

export default Layout;
