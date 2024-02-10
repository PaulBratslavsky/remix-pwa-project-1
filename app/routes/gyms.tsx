import { Page, Navbar } from "konsta/react";

import BackButton from "~/components/BackButton";
import { GymsList } from "~/components/GymsList";

export default function GymRoute() {
  return (
    <Page>
      <Navbar title="Gyms" right={<BackButton />} />
      <GymsList />
    </Page>
  );
}
