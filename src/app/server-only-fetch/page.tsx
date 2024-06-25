import { serverApi } from "~/trpc/server";

export default async function ServerOnlyFetchPage() {
  const data = await serverApi.example.hello2();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-2xl">{data}</div>
    </main>
  );
}
