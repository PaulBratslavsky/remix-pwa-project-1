import { Page, Navbar } from "konsta/react";

import BackButton from "~/components/BackButton";
import TopicsList from "~/components/TopicsList";
export default function ForumRoute() {
  return (
    <Page>
      <Navbar title="Forum" right={<BackButton />} />
      <TopicsList />
    </Page>
  );
}
