import { serverApi } from "~/trpc/server";
import PrefetchClientPage from "./client-page";

export default async function Page() {
  const data = await serverApi.example.hello2();

  return <PrefetchClientPage data={data} />;
}
