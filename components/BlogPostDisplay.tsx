
import React from 'react';

interface BlogPostDisplayProps {
  post: string;
}

export const BlogPostDisplay: React.FC<BlogPostDisplayProps> = ({ post }) => {
  if (!post) {
    return (
      <div className="flex-grow flex items-center justify-center text-center">
        <p className="text-slate-400 text-lg">
          Your generated blog post will appear here. <br />
          Fill in the details and click "Generate" to start!
        </p>
      </div>
    );
  }

  return (
    <div className="prose prose-sm sm:prose-base lg:prose-lg prose-invert max-w-none h-full overflow-y-auto p-1 rounded-md bg-slate-800/50 ring-1 ring-slate-700/50">
      <article className="whitespace-pre-wrap p-4">
        {post}
      </article>
    </div>
  );
};
