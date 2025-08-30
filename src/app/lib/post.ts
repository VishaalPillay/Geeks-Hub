import { Post } from './types';

// Note: fs operations should only be used in server-side code
// For now, we'll use dummy data to avoid build issues

export function getPostSlugs(): string[] {
  // Return slugs from dummy data
  return ['getting-started-with-nextjs', 'mastering-tailwind-css', 'building-modern-web-apps'];
}

export function getPostBySlug(slug: string): Post | null {
  // Get post from dummy data
  const dummyPosts = getDummyPosts();
  return dummyPosts.find(post => post.slug === slug) || null;
}

export function getAllPosts(): Post[] {
  // Return dummy posts
  return getDummyPosts();
}

// Dummy data for initial setup
export function getDummyPosts(): Post[] {
  return [
    {
      slug: 'getting-started-with-nextjs',
      title: 'Getting Started with Next.js 15',
      date: '2025-01-15',
      excerpt: 'Learn the fundamentals of Next.js 15 and build your first server-side rendered React application.',
      content: `# Getting Started with Next.js 15

Next.js is a powerful React framework that enables you to build production-ready applications with ease. In this comprehensive guide, we'll explore the latest features of Next.js 15.

## Why Next.js?

Next.js provides numerous benefits:
- **Server-Side Rendering (SSR)** for better SEO
- **Static Site Generation (SSG)** for optimal performance
- **API Routes** for building full-stack applications
- **Built-in CSS support** with CSS Modules and Tailwind CSS
- **Image Optimization** out of the box

## Setting Up Your First Project

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Key Concepts

### App Router
The new App Router in Next.js 15 provides enhanced routing capabilities with support for layouts, nested routing, and more.

### Server Components
React Server Components allow you to render components on the server, reducing the JavaScript bundle size sent to the client.

## Best Practices

1. Use Server Components by default
2. Implement proper error boundaries
3. Optimize images with next/image
4. Leverage ISR for dynamic content

Stay tuned for more advanced topics in upcoming posts!`,
      tags: ['Next.js', 'React', 'Web Development'],
      author: 'John Developer',
      readTime: '5 min read',
      image: '/api/placeholder/800/400'
    },
    {
      slug: 'mastering-tailwind-css',
      title: 'Mastering Tailwind CSS for Modern Web Design',
      date: '2025-01-20',
      excerpt: 'Discover advanced Tailwind CSS techniques to create stunning, responsive user interfaces.',
      content: `# Mastering Tailwind CSS

Tailwind CSS has revolutionized the way we style web applications. Let's dive deep into advanced techniques and best practices.

## Advanced Techniques

### Custom Animations
Create smooth, engaging animations using Tailwind's animation utilities.

### Dark Mode Implementation
Build a seamless dark mode experience with Tailwind's dark mode support.

## Component Patterns

Learn how to build reusable component patterns with Tailwind CSS.`,
      tags: ['CSS', 'Tailwind', 'Design'],
      author: 'Sarah Designer',
      readTime: '7 min read',
      image: '/api/placeholder/800/400'
    },
    {
      slug: 'building-modern-web-apps',
      title: 'Building Modern Web Applications in 2025',
      date: '2025-01-25',
      excerpt: 'Explore the latest trends and technologies in modern web development.',
      content: `# Building Modern Web Applications

The web development landscape continues to evolve rapidly. Here's what you need to know in 2025.

## Key Technologies

- **TypeScript** for type safety
- **React 19** with improved performance
- **Edge Computing** for faster response times

## Architecture Patterns

Modern applications require scalable architecture patterns.`,
      tags: ['Web Development', 'Architecture', 'Technology'],
      author: 'Mike Tech',
      readTime: '6 min read',
      image: '/api/placeholder/800/400'
    }
  ];
}