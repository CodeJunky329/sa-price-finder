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
    <div className="flex flex-wrap gap-2">
      {allCategories.map((category, index) => {
        const Icon = getCategoryIcon(category);
        const isSelected = selectedCategory === category || 
          (selectedCategory === '' && category === 'All');
        
        return (
          <Button
            key={category}
            variant={isSelected ? 'chipActive' : 'chip'}
            size="chip"
            onClick={() => onSelectCategory(category === 'All' ? '' : category)}
            className={cn(
              'animate-fade-up opacity-0',
              `stagger-${Math.min(index + 1, 6)}`
            )}
            style={{ animationFillMode: 'forwards' }}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{category}</span>
          </Button>
        );
      })}
    </div>
  );
};
