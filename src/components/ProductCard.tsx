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
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-primary/20 animate-fade-up opacity-0',
        `stagger-${Math.min((index % 6) + 1, 6)}`
      )}
      style={{ animationFillMode: 'forwards' }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {!imageError ? (
          <img
            src={product.productImageURL}
            alt={product.productName}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageOff className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
        
        {/* Retailer Badge */}
        <div className="absolute left-3 top-3">
          <RetailerBadge retailer={product.retailer} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category */}
        <span className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="mb-3 line-clamp-2 flex-1 text-sm font-semibold leading-snug text-foreground">
          {product.productName}
        </h3>

        {/* Price */}
        <div className="mb-3">
          <span className="text-xl font-bold text-primary">
            {formatPrice(price)}
          </span>
        </div>

        {/* Compare Button */}
        <Button
          asChild
          variant="retailer"
          size="sm"
          className="w-full"
        >
          <Link 
            to={`/compare/${encodeURIComponent(product.productName)}`}
            state={{ product }}
          >
            Compare Prices
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
};
