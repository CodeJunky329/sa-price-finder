import { useState, useMemo, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { SearchInput } from '@/components/SearchInput';
import { CategoryChips } from '@/components/CategoryChips';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/ProductCardSkeleton';
import { searchProducts, getCategories, getUniqueProducts } from '@/lib/productUtils';
import { Scale, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 14;

  const categories = useMemo(() => getCategories(), []);
  const allProducts = useMemo(() => getUniqueProducts(), []);
  
  const products = useMemo(() => {
    return searchProducts(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

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

  // Simulate loading for skeleton effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-background py-12 sm:py-16">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 animate-fade-up opacity-0 stagger-1" style={{ animationFillMode: 'forwards' }}>
              <Scale className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Compare prices across SA's top retailers
              </span>
            </div>

            {/* Heading */}
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl animate-fade-up opacity-0 stagger-2" style={{ animationFillMode: 'forwards' }}>
              Find the{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                best prices
              </span>
              {' '}instantly
            </h1>

            <p className="mb-8 text-lg text-muted-foreground animate-fade-up opacity-0 stagger-3" style={{ animationFillMode: 'forwards' }}>
              Compare prices from Pick n Pay, Checkers, Shoprite & Woolworths all in one place.
            </p>

            {/* Search */}
            <div className="relative z-20 mb-8 animate-fade-up opacity-0 stagger-4" style={{ animationFillMode: 'forwards' }}>
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search for products..."
                suggestions={suggestions}
              />
            </div>

            {/* Feature Pills */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 animate-fade-up opacity-0 stagger-5" style={{ animationFillMode: 'forwards' }}>
              {[
                { icon: TrendingUp, label: 'Real-time prices' },
                { icon: ShieldCheck, label: 'Trusted retailers' },
                { icon: Zap, label: 'Instant comparison' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 shadow-card"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      </section>

      {/* Products Section */}
      <section className="py-8 sm:py-12">
        <div className="container">
          {/* Category Filters */}
          <div className="mb-8">
            <CategoryChips
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isLoading ? (
                <span className="animate-pulse-soft">Loading products...</span>
              ) : (
                <>
                  Showing <span className="font-semibold text-foreground">{products.length}</span> products
                  {selectedCategory && (
                    <> in <span className="font-semibold text-foreground">{selectedCategory}</span></>
                  )}
                </>
              )}
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading ? (
              // Skeleton Loading
              Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            ) : products.length > 0 ? (
              // Product Cards
              paginatedProducts.map((product, index) => (
                <ProductCard
                  key={`${product.productName}-${product.retailer}-${index}`}
                  product={product}
                  index={index}
                />
              ))
            ) : (
              // No Results
              <div className="col-span-full py-16 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                  <Scale className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  No products found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or category filters
                </p>
              </div>
            )}
          </div
>
          {!isLoading && totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      size="default"
                      isActive={currentPage === i + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(i + 1);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
