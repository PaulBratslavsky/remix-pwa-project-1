import { Fab } from "konsta/react";
import { Plus } from "lucide-react";

export default function TopAddButton({ onClick}: { onClick: Function}) {
  return (
    <Fab
    className="fixed right-4-safe ios:top-15-safe material:top-18-safe z-50 k-color-brand-red"
    icon={
      <div className="flex justify-center items-center mt-[2px]">
        <Plus />
      </div>
    }
    onClick={() => onClick(true)}
  />
  )
}
