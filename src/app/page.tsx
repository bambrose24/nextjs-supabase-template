import { serverApi } from "~/trpc/server";

export default async function Home() {
  const { greeting } = await serverApi.example.hello({
    text: "Next.js + Supabase = 🎉",
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-2xl">{greeting}</div>
    </main>
  );
}
