import { Page, Navbar } from "konsta/react";

import BackButton from "~/components/BackButton";

export default function GymRoute() {
  return (
    <Page>
      <Navbar title="Gyms" right={<BackButton />} />
    </Page>
  );
}
