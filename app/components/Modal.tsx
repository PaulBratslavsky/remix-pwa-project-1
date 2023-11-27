import type { ReactNode } from "react";
import { Sheet, Block, Toolbar, Link } from "konsta/react";
export default function SheetModalPage({
  children,
  open,
  setOpen,
}: {
  children: ReactNode;
  open: boolean;
  setOpen: Function;
}) {
  return (
    <Sheet
      className="pb-safe w-full"
      opened={open}
      onBackdropClick={() => setOpen(false)}
    >
      <Toolbar top>
        <div className="left" />
        <div className="right">
          <Link toolbar onClick={() => setOpen(false)}>
            Done
          </Link>
        </div>
      </Toolbar>
      <Block>
        <div>{children}</div>
      </Block>
    </Sheet>
  );
}
