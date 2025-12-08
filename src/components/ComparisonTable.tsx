import { Product, Retailer } from '@/types/product';
import { parsePrice, formatPrice, getRetailerColor } from '@/lib/productUtils';
import { RetailerBadge } from './RetailerBadge';
import { Button } from '@/components/ui/button';
import { ExternalLink, TrendingDown, Crown, ImageOff } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ComparisonTableProps {
  products: Product[];
}

export const ComparisonTable = ({ products }: ComparisonTableProps) => {
  const sortedProducts = [...products].sort(
    (a, b) => parsePrice(a.price) - parsePrice(b.price)
  );

  const lowestPrice = parsePrice(sortedProducts[0]?.price || '0');
  const highestPrice = parsePrice(sortedProducts[sortedProducts.length - 1]?.price || '0');
  const savings = highestPrice - lowestPrice;

  return (
    <div className="space-y-4">
      {/* Savings Banner */}
      {savings > 0 && (
        <div className="flex items-center gap-3 rounded-xl bg-primary/10 border border-primary/20 p-4 animate-fade-up">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
            <TrendingDown className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              Save up to <span className="text-primary font-bold">{formatPrice(savings)}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              by comparing prices across retailers
            </p>
          </div>
        </div>
      )}

      {/* Comparison Cards */}
      <div className="space-y-3">
        {sortedProducts.map((product, index) => (
          <ComparisonCard
            key={`${product.retailer}-${index}`}
            product={product}
            isLowest={index === 0}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

interface ComparisonCardProps {
  product: Product;
  isLowest: boolean;
  index: number;
}

const ComparisonCard = ({ product, isLowest, index }: ComparisonCardProps) => {
  const [imageError, setImageError] = useState(false);
  const colors = getRetailerColor(product.retailer);
  const price = parsePrice(product.price);

  return (
    <div
      className={cn(
        'relative flex flex-col sm:flex-row items-stretch sm:items-center gap-4 rounded-xl border p-4 transition-all duration-300 hover:shadow-card-hover animate-fade-up opacity-0',
        isLowest 
          ? 'border-primary/30 bg-primary/5 shadow-soft' 
          : 'border-border bg-card',
        `stagger-${Math.min(index + 1, 6)}`
      )}
      style={{ animationFillMode: 'forwards' }}
    >
      {/* Best Price Badge */}
      {isLowest && (
        <div className="absolute -top-2 left-4 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-soft">
          <Crown className="h-3 w-3" />
          Best Price
        </div>
      )}

      {/* Product Image */}
      <div className={cn(
        'flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border',
        isLowest ? 'border-primary/20 bg-card' : 'border-border bg-muted/50'
      )}>
        {!imageError ? (
          <img
            src={product.productImageURL}
            alt={product.productName}
            className="h-14 w-14 object-contain"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <ImageOff className="h-6 w-6 text-muted-foreground/50" />
        )}
      </div>

      {/* Retailer Info */}
      <div className="flex-1 space-y-1">
        <RetailerBadge retailer={product.retailer} size="md" />
        <p className="text-xs text-muted-foreground line-clamp-1">
          {product.productName}
        </p>
      </div>

      {/* Price & Action */}
      <div className="flex items-center gap-4">
        <span className={cn(
          'text-xl font-bold',
          isLowest ? 'text-primary' : 'text-foreground'
        )}>
          {formatPrice(price)}
        </span>
        <Button
          asChild
          variant={isLowest ? 'default' : 'outline'}
          size="sm"
        >
          <a
            href={product.productURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy Now
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};
