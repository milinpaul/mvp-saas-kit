import { Button, buttonVariants } from "@/co/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <main className="p-24">
      <h1 className="text-gray-700">ReMarks App</h1>

      <Button>Register</Button>

      <Button variant="outline">Outline Button</Button>
    </main>
  );
}
