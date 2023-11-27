import { Page, Navbar } from "konsta/react";

import BackButton from "~/components/BackButton";

export default function ForumRoute() {
  return (
    <Page>
      <Navbar title="Forum" right={<BackButton />} />
    </Page>
  );
}
