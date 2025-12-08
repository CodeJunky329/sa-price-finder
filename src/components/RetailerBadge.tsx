import { Retailer } from '@/types/product';
import { getRetailerColor } from '@/lib/productUtils';
import { cn } from '@/lib/utils';

interface RetailerBadgeProps {
  retailer: Retailer;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RetailerBadge = ({ retailer, size = 'md', className }: RetailerBadgeProps) => {
  const colors = getRetailerColor(retailer);

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium border',
        colors.bg,
        colors.text,
        colors.border,
        sizeClasses[size],
        className
      )}
    >
      {retailer}
    </span>
  );
};
