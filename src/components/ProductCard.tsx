import { Product } from '@/types/product';
import { parsePrice, formatPrice } from '@/lib/productUtils';
import { RetailerBadge } from './RetailerBadge';
import { Button } from '@/components/ui/button';
import { ArrowRight, ImageOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);
  const price = parsePrice(product.price);

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-primary/20 animate-fade-up opacity-0',
        `stagger-${Math.min((index % 6) + 1, 6)}`
      )}
      style={{ animationFillMode: 'forwards' }}
    >
      {/* Image Container - smaller on mobile */}
      <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-muted">
        {!imageError ? (
          <img
            src={product.productImageURL}
            alt={product.productName}
            className="h-full w-full object-contain p-3 sm:p-4 transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageOff className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground/50" />
          </div>
        )}
        
        {/* Retailer Badge */}
        <div className="absolute left-2 top-2 sm:left-3 sm:top-3">
          <RetailerBadge retailer={product.retailer} size="sm" />
        </div>
      </div>

      {/* Content - better spacing on mobile */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Category */}
        <span className="mb-0.5 sm:mb-1 text-[10px] sm:text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="mb-2 sm:mb-3 line-clamp-2 flex-1 text-xs sm:text-sm font-semibold leading-tight sm:leading-snug text-foreground">
          {product.productName}
        </h3>

        {/* Price & Button Row on Mobile */}
        <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-stretch sm:gap-3">
          {/* Price */}
          <span className="text-lg sm:text-xl font-bold text-primary whitespace-nowrap">
            {formatPrice(price)}
          </span>

          {/* Compare Button */}
          <Button
            asChild
            variant="retailer"
            size="sm"
            className="h-7 px-2.5 text-[11px] sm:h-9 sm:px-4 sm:text-sm sm:w-full [&_svg]:size-3 sm:[&_svg]:size-4"
          >
            <Link 
              to={`/compare/${encodeURIComponent(product.productName)}`}
              state={{ product }}
            >
              <span className="hidden sm:inline">Compare Prices</span>
              <span className="sm:hidden">Compare</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
};
