import ReactMarkdown from 'react-markdown';

interface PostContentProps {
  content: string;
}

export const PostContent = ({ content }: PostContentProps) => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  );
};
