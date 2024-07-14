import { serverApi } from "~/trpc/server";
import { supabaseServer } from "~/util/supabase/server";
import { ClientDemoCard } from "./client-page";

export default async function Home() {
  const { greeting } = await serverApi.example.hello({
    text: "Next.js + Supabase = 🎉",
  });
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();

  console.log("server side user?", data.user);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="text-2xl">{greeting}</div>
      <ClientDemoCard user={Boolean(data.user)} />
    </main>
  );
}
