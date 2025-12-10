import { Retailer } from '@/types/product';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Filter, SortAsc, SortDesc, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

const RETAILERS: Retailer[] = ['Pick n Pay', 'Checkers', 'Shoprite', 'Woolworths'];

const RETAILER_STYLES: Record<Retailer, { bg: string; text: string; activeBg: string }> = {
  'Pick n Pay': { bg: 'bg-pnp-light', text: 'text-pnp', activeBg: 'bg-pnp' },
  'Checkers': { bg: 'bg-checkers-light', text: 'text-checkers', activeBg: 'bg-checkers' },
  'Shoprite': { bg: 'bg-shoprite-light', text: 'text-shoprite', activeBg: 'bg-shoprite' },
  'Woolworths': { bg: 'bg-woolworths-light', text: 'text-woolworths', activeBg: 'bg-woolworths' },
};

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

interface ProductFiltersProps {
  selectedRetailers: Retailer[];
  onRetailersChange: (retailers: Retailer[]) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const ProductFilters = ({
  selectedRetailers,
  onRetailersChange,
  sortOption,
  onSortChange,
}: ProductFiltersProps) => {
  const toggleRetailer = (retailer: Retailer) => {
    if (selectedRetailers.includes(retailer)) {
      onRetailersChange(selectedRetailers.filter(r => r !== retailer));
    } else {
      onRetailersChange([...selectedRetailers, retailer]);
    }
  };

  const clearFilters = () => {
    onRetailersChange([]);
    onSortChange('name-asc');
  };

  const activeFiltersCount = selectedRetailers.length + (sortOption !== 'name-asc' ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Retailers */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Retailers</h4>
        <div className="flex flex-wrap gap-2">
          {RETAILERS.map(retailer => {
            const isActive = selectedRetailers.includes(retailer);
            const styles = RETAILER_STYLES[retailer];
            return (
              <button
                key={retailer}
                onClick={() => toggleRetailer(retailer)}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200',
                  isActive
                    ? `${styles.activeBg} text-white shadow-sm`
                    : `${styles.bg} ${styles.text} hover:opacity-80`
                )}
              >
                {retailer}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Sort by</h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'price-asc', label: 'Price: Low', icon: SortAsc },
            { value: 'price-desc', label: 'Price: High', icon: SortDesc },
            { value: 'name-asc', label: 'Name: A-Z', icon: SortAsc },
            { value: 'name-desc', label: 'Name: Z-A', icon: SortDesc },
          ].map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => onSortChange(value as SortOption)}
              className={cn(
                'flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all',
                sortOption === value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/30'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="w-full text-muted-foreground"
        >
          <X className="mr-2 h-4 w-4" />
          Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile: Sheet trigger */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="relative gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="h-5 min-w-[20px] rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto max-h-[70vh] rounded-t-2xl">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Inline */}
      <div className="hidden md:flex md:items-center md:gap-6">
        {/* Retailer chips */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Retailer:</span>
          {RETAILERS.map(retailer => {
            const isActive = selectedRetailers.includes(retailer);
            const styles = RETAILER_STYLES[retailer];
            return (
              <button
                key={retailer}
                onClick={() => toggleRetailer(retailer)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
                  isActive
                    ? `${styles.activeBg} text-white shadow-sm`
                    : `${styles.bg} ${styles.text} hover:opacity-80`
                )}
              >
                {retailer}
              </button>
            );
          })}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Sort:</span>
          <div className="flex gap-1">
            {[
              { value: 'price-asc', label: 'Price ↑' },
              { value: 'price-desc', label: 'Price ↓' },
              { value: 'name-asc', label: 'A-Z' },
              { value: 'name-desc', label: 'Z-A' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => onSortChange(value as SortOption)}
                className={cn(
                  'rounded-md px-2 py-1 text-xs font-medium transition-all',
                  sortOption === value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>
    </>
  );
};
