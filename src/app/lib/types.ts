export interface Post {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    tags: string[];
    author: string;
    readTime: string;
    image?: string;
  }