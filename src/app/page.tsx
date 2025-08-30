import { getAllPosts } from './lib/post';
import BlogList from './components/BlogList';

export default function Home() {
  const allPosts = getAllPosts();

  return (
    <BlogList initialPosts={allPosts} />
  );
}