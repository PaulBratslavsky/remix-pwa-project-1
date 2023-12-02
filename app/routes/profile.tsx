import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getUserData } from "~/utils/session.server";
import { Page, Navbar } from "konsta/react";

import BackButton from "~/components/BackButton";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUserData(request);
  if (!user) return redirect("/login");
  return null;
}

export default function ProfileRoute() {
  return (
    <Page>
      <Navbar title="Profile" right={<BackButton />} />
    </Page>
  );
}
