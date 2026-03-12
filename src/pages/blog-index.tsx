import { usePosts } from '@/hooks/use-posts';
import { BlogPostCard } from '@/components/blog/blog-post-card';
import { Link } from 'react-router-dom';

const BlogIndex = () => {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 text-center text-red-500">
        Error loading posts.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Discovery Blog</h1>
      <p className="text-muted-foreground mb-8 text-lg max-w-2xl">
        Explore articles, guides, and tips for your homeschooling journey.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="block">
            <BlogPostCard 
              {...post}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogIndex;
