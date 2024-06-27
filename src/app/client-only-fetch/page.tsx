"use client";

import { clientApi } from "~/trpc/react";

export default function ClientOnlyFetchPage() {
  const { data, isPending } = clientApi.example.hello2.useQuery();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-2xl">{isPending && !data ? "Loading..." : data}</div>
    </main>
  );
}
