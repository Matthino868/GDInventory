// app/page.tsx (root)
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  // If logged in, go to dashboard; else go to login
  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}