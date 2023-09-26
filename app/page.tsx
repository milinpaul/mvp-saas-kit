import Link from "next/link";

import { Button } from "@/co/ui/button";
import { routes } from "@/lib/routes";
import { getEnvString } from "@/lib/siteConfig";
import Test from "./test";

export default function Home() {
  return (
    <main className="p-24">
      <h1 className="text-gray-700">MVP SaaS App</h1>

      <Test />
      <Link href={routes.register}>
        <Button>Register</Button>
      </Link>
      <Link href={routes.login}>
        <Button variant="outline">Login</Button>
      </Link>
    </main>
  );
}
