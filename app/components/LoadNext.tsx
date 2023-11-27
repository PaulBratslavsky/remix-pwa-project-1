import { Block, Button } from "konsta/react";

export default function LoadNext({ pageCount, onClick } : {
  pageCount: number;
  onClick: () => void;
}) {
  if (pageCount === 1) return null
  return (
      <Block className="text-center">
        <Button rounded large onClick={onClick}>
          Load Next
        </Button>
      </Block>
  )
}
