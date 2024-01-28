import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface RichTextProps {
  content: string;
}

export default function RichText({ content }: RichTextProps) {
  return (
    <Markdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]} className="rich-text">
      {content}
    </Markdown>
  );
}