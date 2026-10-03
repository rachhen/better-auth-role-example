import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in?redirectTo=/dashboard");
  }

  return (
    <div className="flex flex-col items-center my-auto">
      <h1 className="text-2xl">Hello, {session.user.email}</h1>

      <Link href="/auth/sign-out">Sign Out</Link>
    </div>
  );
}
