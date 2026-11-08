import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
}

const sizes = { sm: 12, md: 16, lg: 20 };

export default function StarRating({
  rating,
  max = 5,
  size = 'md',
  showValue = false,
  reviewCount,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;
          return (
            <div key={i} className="relative">
              <Star
                size={sizes[size]}
                className="star-empty fill-current"
              />
              {(filled || partial) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? '100%' : `${(rating % 1) * 100}%` }}
                >
                  <Star
                    size={sizes[size]}
                    className="star-filled fill-current"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showValue && (
        <span className={cn(
          'font-semibold text-[#F5F5F0]',
          size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
        )}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className={cn(
          'text-[#6B6B65]',
          size === 'sm' ? 'text-xs' : 'text-sm'
        )}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
