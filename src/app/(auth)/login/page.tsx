import { redirect } from "next/navigation";
import { supabaseServer } from "~/util/supabase/server";
import { LoginClientPage } from "./client-page";

export default async function LoginPage() {
  const supabase = supabaseServer();

  const { data } = await supabase.auth.getUser();
  if (data.user) {
    // NOTE: you can change the default redirect behavior. But this lets it be server-side instead of client-side.
    redirect("/");
  }

  return <LoginClientPage />;
}
