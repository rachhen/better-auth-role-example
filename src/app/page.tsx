import { Button } from "@/components/ui/button";
import { db } from "@/db";

export default async function Home() {
  const users = await db.query.users.findMany();

  console.log("users", users);

  return (
    <div>
      <Button>Hello</Button>
    </div>
  );
}
