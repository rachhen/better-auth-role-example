import { AppSidebar } from "@/components/app-sidebar";
import { OrganizationSwitcher } from "@/components/auth/organization/organization-switcher";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="px-4 py-2 border-b border-border">
            <OrganizationSwitcher />
          </div>

          {children}
        </SidebarInset>
      </SidebarProvider>
    </HydrationBoundary>
  );
}

export default Layout;
