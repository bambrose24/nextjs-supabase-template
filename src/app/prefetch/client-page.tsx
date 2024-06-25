"use client";
import { clientApi } from "~/trpc/react";
import { type RouterOutputs } from "~/trpc/server";

type Props = {
  data: RouterOutputs["example"]["hello2"];
};

export default function PrefetchClientPage({ data: initialData }: Props) {
  const { data } = clientApi.example.hello2.useQuery(undefined, {
    // setting initialData here populates it on the first render
    initialData,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-2xl">{data}</div>
    </main>
  );
}
