"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { clientApi } from "~/trpc/react";
import { supabaseBrowser } from "~/util/supabase/browser";

export function ClientDemoCard({ user }: { user: boolean }) {
  const router = useRouter();
  const utils = clientApi.useUtils();
  const onLogout = async () => {
    console.log("going to log out...");
    const supabase = supabaseBrowser();
    const logoutResponse = await supabase.auth.signOut();

    console.log("logoutResponse", logoutResponse);

    // invalidate tRPC cache
    await utils.invalidate();

    router.refresh();
  };
  return (
    <Card className="max-w-[400px]">
      <CardHeader>
        <CardTitle>Getting Started</CardTitle>
        <CardDescription>Read the README to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        This project is a starter that gets you many basic things set up,
        including Supabase Auth, ShadCN UI, the Next.js App Router, tRPC, and
        many other decent defaults ready for you. Speed run the setup for your
        project by cloning this.
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-row gap-2">
          {user ? (
            <Button onClick={onLogout} className="w-full">
              Logout
            </Button>
          ) : (
            <Link href="/login" className="w-full">
              <Button className="w-full">Login</Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
