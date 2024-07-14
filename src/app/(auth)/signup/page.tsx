import { redirect } from "next/navigation";
import { SignupClientPage } from "./client-page";
import { supabaseServer } from "~/util/supabase/server";

export default async function SignupPage() {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    // NOTE: you can redirect anywhere
    redirect("/");
  }
  return <SignupClientPage />;
}
