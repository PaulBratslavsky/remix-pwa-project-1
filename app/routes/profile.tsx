import { Page, Navbar } from "konsta/react";

import BackButton from "~/components/BackButton";

export default function ProfileRoute() {
  return (
    <Page>
      <Navbar title="Profile" right={<BackButton />} />
    </Page>
  );
}
