import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from './types';

// This points to the `src/content/posts` directory
const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export function getAllPosts(): Post[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const wordCount = content.split(/\s+/).length;
        const readTime = `${Math.ceil(wordCount / 200)} min read`;

        return {
          slug,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          content,
          tags: data.tags || [],
          author: data.author || 'Anonymous',
          readTime,
          image: data.image || '',
        };
      });

    return allPostsData.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
  } catch (error) {
    console.error("Could not read posts directory. Ensure it exists at `src/content/posts`.", error);
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.ceil(wordCount / 200)} min read`;

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      content,
      tags: data.tags || [],
      author: data.author || 'Anonymous',
      readTime,
      image: data.image || '',
    };
  } catch (error) {
    return null;
  }
}