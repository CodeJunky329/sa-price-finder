import { useState, useMemo, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { SearchInput } from '@/components/SearchInput';
import { CategoryChips } from '@/components/CategoryChips';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/ProductCardSkeleton';
import { ProductFilters, SortOption } from '@/components/ProductFilters';
import { searchProducts, getCategories, getUniqueProducts, parsePrice } from '@/lib/productUtils';
import { Scale, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Retailer } from '@/types/product';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRetailers, setSelectedRetailers] = useState<Retailer[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 12;

  const categories = useMemo(() => getCategories(), []);
  const allProducts = useMemo(() => getUniqueProducts(), []);
  
  const products = useMemo(() => {
    let results = searchProducts(searchQuery, selectedCategory);
    
    // Filter by retailer
    if (selectedRetailers.length > 0) {
      results = results.filter(p => selectedRetailers.includes(p.retailer));
    }
    
    // Sort
    results = [...results].sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return parsePrice(a.price) - parsePrice(b.price);
        case 'price-desc':
          return parsePrice(b.price) - parsePrice(a.price);
        case 'name-desc':
          return b.productName.localeCompare(a.productName);
        case 'name-asc':
        default:
          return a.productName.localeCompare(b.productName);
      }
    });
    
    return results;
  }, [searchQuery, selectedCategory, selectedRetailers, sortOption]);

  const suggestions = useMemo(() => {
    return [...new Set(allProducts.map(p => p.productName))].slice(0, 20);
  }, [allProducts]);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [products, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedRetailers, sortOption]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedRetailers, sortOption]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-background py-10 sm:py-16">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 sm:px-4 sm:py-2 animate-fade-up opacity-0 stagger-1" style={{ animationFillMode: 'forwards' }}>
              <Scale className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">
                Compare prices across SA's top retailers
              </span>
            </div>

            {/* Heading */}
            <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground animate-fade-up opacity-0 stagger-2" style={{ animationFillMode: 'forwards' }}>
              Find the{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                best prices
              </span>
              {' '}instantly
            </h1>

            <p className="mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg text-muted-foreground animate-fade-up opacity-0 stagger-3 px-4" style={{ animationFillMode: 'forwards' }}>
              Compare prices from Pick n Pay, Checkers, Shoprite & Woolworths all in one place.
            </p>

            {/* Search */}
            <div className="relative z-20 mb-6 sm:mb-8 animate-fade-up opacity-0 stagger-4 px-2" style={{ animationFillMode: 'forwards' }}>
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search for products..."
                suggestions={suggestions}
              />
            </div>

            {/* Feature Pills - hidden on mobile for cleaner look */}
            <div className="relative z-10 hidden sm:flex flex-wrap items-center justify-center gap-3 sm:gap-4 animate-fade-up opacity-0 stagger-5" style={{ animationFillMode: 'forwards' }}>
              {[
                { icon: TrendingUp, label: 'Real-time prices' },
                { icon: ShieldCheck, label: 'Trusted retailers' },
                { icon: Zap, label: 'Instant comparison' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full bg-card border border-border px-3 py-1.5 sm:px-4 sm:py-2 shadow-card"
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-1/2 top-0 h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      </section>

      {/* Products Section */}
      <section className="py-6 sm:py-12">
        <div className="container px-3 sm:px-4">
          {/* Category Filters */}
          <div className="mb-4 sm:mb-6">
            <CategoryChips
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Filters Row */}
          <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-muted-foreground">
              {isLoading ? (
                <span className="animate-pulse-soft">Loading...</span>
              ) : (
                <>
                  <span className="font-semibold text-foreground">{products.length}</span> products
                  {selectedCategory && (
                    <span className="hidden sm:inline"> in <span className="font-semibold text-foreground">{selectedCategory}</span></span>
                  )}
                </>
              )}
            </p>
            <ProductFilters
              selectedRetailers={selectedRetailers}
              onRetailersChange={setSelectedRetailers}
              sortOption={sortOption}
              onSortChange={setSortOption}
            />
          </div>

          {/* Product Grid - improved for mobile */}
          <div className="grid grid-cols-2 gap-2.5 xs:gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            ) : products.length > 0 ? (
              paginatedProducts.map((product, index) => (
                <ProductCard
                  key={`${product.productName}-${product.retailer}-${index}`}
                  product={product}
                  index={index}
                />
              ))
            ) : (
              <div className="col-span-full py-12 sm:py-16 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-muted">
                  <Scale className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-base sm:text-lg font-semibold text-foreground">
                  No products found
                </h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>

          {!isLoading && totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent className="gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        size="default"
                        isActive={currentPage === page}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                        className="h-8 w-8 sm:h-9 sm:w-9 text-xs sm:text-sm"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
