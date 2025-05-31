/* eslint-disable react/prop-types */
import { Star } from "lucide-react";

function RateStars({ rates = [], uprates, downrates }) {
  const MAX_STARS = 5;

  const netRating = uprates - downrates;

  const ratingPercentage = (netRating / rates.length) * MAX_STARS;

  const fullStars = Math.floor(ratingPercentage);
  const hasHalfStar = ratingPercentage % 1 >= 0.5;
  const emptyStars = MAX_STARS - Math.ceil(ratingPercentage);

  return (
    <div>
      <span className="flex items-center gap-1 text-xs">
        Rate:
        {[...Array(fullStars)].map((_, index) => (
          <Star
            key={`full-${index}`}
            className="h-4 w-4"
            fill="gold"
            stroke="gold"
          />
        ))}
        {hasHalfStar && (
          <Star key="half" className="h-4 w-4" fill="gold" stroke="gold" />
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <Star
            key={`empty-${index}`}
            className="h-4 w-4"
            fill="none"
            stroke="gold"
          />
        ))}
      </span>
    </div>
  );
}

export default RateStars;
