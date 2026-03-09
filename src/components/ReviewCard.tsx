import { Star, ThumbsUp } from "lucide-react";
import type { Review } from "@/data/providers";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < review.rating);

  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-card-foreground">{review.author}</p>
          <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        <div className="flex items-center gap-0.5">
          {stars.map((filled, i) => (
            <Star key={i} className={`h-3.5 w-3.5 ${filled ? "fill-accent text-accent" : "text-muted"}`} />
          ))}
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{review.text}</p>
      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <ThumbsUp className="h-3 w-3" />
        <span>{review.helpful} found this helpful</span>
      </div>
    </div>
  );
};

export default ReviewCard;
