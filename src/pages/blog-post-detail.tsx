import { useParams, Link } from 'react-router-dom';
import { usePost } from '@/hooks/use-posts';
import { PostContent } from '@/components/blog/post-content';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const BlogPostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = usePost(slug || '');

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/blog">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="container mx-auto py-12 max-w-4xl px-4 md:px-6">
      <div className="mb-8 mt-4">
        <Link to="/blog">
          <Button variant="ghost" className="mb-6 -ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
        
        <Badge className="mb-4 text-sm">{post.category}</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex items-center text-muted-foreground gap-6 text-sm mb-8 border-b border-border pb-8">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
        </div>
        
        {post.imageUrl && (
          <div className="rounded-2xl overflow-hidden mb-12 h-[300px] md:h-[500px]">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <PostContent content={post.content} />
    </article>
  );
};

export default BlogPostDetail;
