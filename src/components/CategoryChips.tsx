import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  ShoppingCart, 
  Zap, 
  Heart, 
  Sparkles, 
  Home, 
  PenTool,
  LayoutGrid 
} from 'lucide-react';

interface CategoryChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const getCategoryIcon = (category: string) => {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    'All': LayoutGrid,
    'Groceries': ShoppingCart,
    'Electronics': Zap,
    'Health & Wellness': Heart,
    'Personal Care': Sparkles,
    'Cleaning & Household': Home,
    'Stationery': PenTool,
  };
  return icons[category] || LayoutGrid;
};

export const CategoryChips = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryChipsProps) => {
  const allCategories = ['All', ...categories];

  return (
    <div className="overflow-x-auto scrollbar-hide pb-2 sm:pb-0">
      <div className="flex gap-2 sm:flex-wrap min-w-max sm:min-w-0">
        {allCategories.map((category, index) => {
          const Icon = getCategoryIcon(category);
          const isSelected = selectedCategory === category || 
            (selectedCategory === '' && category === 'All');
          
          // Shorten category names for mobile
          const shortName: Record<string, string> = {
            'Cleaning & Household': 'Household',
            'Health & Wellness': 'Health',
            'Personal Care': 'Care',
          };
          const displayName = shortName[category] || category;
          
          return (
            <Button
              key={category}
              variant={isSelected ? 'chipActive' : 'chip'}
              size="chip"
              onClick={() => onSelectCategory(category === 'All' ? '' : category)}
              className={cn(
                'animate-fade-up opacity-0 shrink-0 h-9 sm:h-8 px-3 sm:px-4 text-xs sm:text-sm',
                `stagger-${Math.min(index + 1, 6)}`
              )}
              style={{ animationFillMode: 'forwards' }}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="sm:hidden">{displayName}</span>
              <span className="hidden sm:inline">{category}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
