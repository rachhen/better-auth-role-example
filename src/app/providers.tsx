"use client";

import { AuthProvider } from "@/components/auth/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { authClient } from "@/lib/auth-client";
import { deleteUserPlugin } from "@/lib/auth/delete-user-plugin";
import { lastLoginMethodPlugin } from "@/lib/auth/last-login-method-plugin";
import { organizationPlugin } from "@/lib/auth/organization-plugin";
import { themePlugin } from "@/lib/auth/theme-plugin";
import { getQueryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export const Providers = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider
        authClient={authClient}
        redirectTo="/dashboard"
        socialProviders={[]}
        emailAndPassword={{ requireEmailVerification: false }}
        navigate={({ to, replace }) =>
          replace ? router.replace(to) : router.push(to)
        }
        plugins={[
          themePlugin({ useTheme }),
          deleteUserPlugin(),
          lastLoginMethodPlugin(),
          organizationPlugin({
            allowMultipleRoles: false,
          }),
        ]}
        Link={Link}
      >
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
};
