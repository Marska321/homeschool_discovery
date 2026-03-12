import { useQuery } from '@tanstack/react-query';
import matter from 'gray-matter';

// Note: In Vite, we use import.meta.glob to read raw string content of files
const markdownFiles = import.meta.glob('/content/*.md', { query: '?raw', import: 'default' });

export interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  slug: string;
  content: string;
}

export const fetchPosts = async (): Promise<BlogPost[]> => {
  const posts: BlogPost[] = [];
  
  for (const path in markdownFiles) {
    // Extract actual file name as slug
    const slug = path.replace('/content/', '').replace('.md', '');
    const rawContent = await markdownFiles[path]() as string;
    
    // Parse using gray-matter
    const { data: frontmatter, content } = matter(rawContent);
    
    posts.push({
      title: frontmatter.title || 'Untitled',
      description: frontmatter.description || '',
      date: frontmatter.date || '',
      readTime: frontmatter.readTime || '',
      category: frontmatter.category || 'Uncategorized',
      imageUrl: frontmatter.imageUrl || '/api/placeholder/400/250',
      slug,
      content
    });
  }
  
  // Sort by date (descending)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const fetchPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  const posts = await fetchPosts();
  return posts.find(post => post.slug === slug);
};

export const usePosts = () => {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: fetchPosts,
  });
};

export const usePost = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => fetchPostBySlug(slug),
    enabled: !!slug,
  });
};
