import { Page, Navbar } from "konsta/react";

import BackButton from "~/components/BackButton";

export default function LessonsRoute() {
  return (
    <Page>
      <Navbar title="Lessons" right={<BackButton />} />
    </Page>
  );
}
