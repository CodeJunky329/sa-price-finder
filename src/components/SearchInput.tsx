import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search products...',
  suggestions = [],
  onSuggestionClick,
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = suggestions
    .filter(s => s.toLowerCase().includes(value.toLowerCase()))
    .slice(0, 5);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div
        className={cn(
          'relative flex items-center overflow-hidden rounded-2xl border bg-card transition-all duration-300',
          isFocused 
            ? 'border-primary shadow-soft ring-2 ring-primary/20' 
            : 'border-border shadow-card hover:border-primary/30'
        )}
      >
        <Search 
          className={cn(
            'ml-4 h-5 w-5 transition-colors duration-200',
            isFocused ? 'text-primary' : 'text-muted-foreground'
          )} 
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent px-3 py-4 text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
        {value && (
          <button
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            className="mr-3 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showSuggestions && value && filteredSuggestions.length > 0 && (
        <div className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-card shadow-card-hover animate-scale-in">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              onClick={() => {
                onSuggestionClick?.(suggestion);
                onChange(suggestion);
                setShowSuggestions(false);
              }}
              className={cn(
                'flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-accent',
                index === 0 && 'rounded-t-xl',
                index === filteredSuggestions.length - 1 && 'rounded-b-xl'
              )}
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
