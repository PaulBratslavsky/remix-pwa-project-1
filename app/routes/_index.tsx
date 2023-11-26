import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Block, Button, Page, Fab } from "konsta/react";
import { Plus } from "lucide-react";
import Modal from "~/components/Modal";
import BottomMenu from "~/components/BottomMenu";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [open, setOpen] = useState(false);
  return (
    <Page>
      <h1>Welcome to Remix</h1>
      <Fab
        className="fixed right-4-safe ios:top-15-safe material:top-18-safe z-20 k-color-brand-red"
        icon={<div className="flex justify-center items-center mt-[2px]"><Plus  /></div>}
        onClick={() => setOpen(true)}
      />
      <Block strongIos outlineIos className="space-y-4">
        <p>
          Sheet Modals slide up from the bottom of the screen to reveal more
          content. Such modals allow to create custom overlays with custom
          content.
        </p>
        <p>
          <Button onClick={() => setOpen(true)}>Open Sheet</Button>
        </p>
      </Block>

      <BottomMenu />

      <Modal open={open} setOpen={setOpen}>
        <p>This should be a form</p>
      </Modal>
    </Page>
  );
}
