import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogPostProps {
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  slug: string;
}

export const BlogPostCard = ({ 
  title, 
  description, 
  date, 
  readTime, 
  category,
  imageUrl
}: BlogPostProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-muted">
      {/* Image Header */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-4 left-4 bg-primary/90 hover:bg-primary backdrop-blur-sm">
          {category}
        </Badge>
      </div>

      <CardHeader className="space-y-2">
        <div className="flex items-center text-xs text-muted-foreground gap-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {readTime}
          </span>
        </div>
        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-3">
          {description}
        </p>
      </CardContent>

      <CardFooter className="pt-0">
        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent group/btn text-primary font-semibold">
          Read Discovery
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};
