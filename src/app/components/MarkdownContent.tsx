'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 mt-8">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3 mt-6">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-2 mt-4">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-foreground mb-4 leading-relaxed">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-foreground">
              {children}
            </li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary hover:text-secondary underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-foreground/80">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-card-bg px-2 py-1 rounded text-sm text-primary">
                {children}
              </code>
            ) : (
              <code className="block bg-card-bg p-4 rounded-lg overflow-x-auto text-sm">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-card-bg p-4 rounded-lg overflow-x-auto mb-4">
              {children}
            </pre>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-foreground">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic">
              {children}
            </em>
          ),
          hr: () => (
            <hr className="my-8 border-border" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;