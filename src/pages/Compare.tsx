import { useParams, useLocation, Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Layout } from '@/components/Layout';
import { ComparisonTable } from '@/components/ComparisonTable';
import { Product } from '@/types/product';
import { getSimilarProducts, products as allProducts } from '@/lib/productUtils';
import { ArrowLeft, ImageOff, AlertTriangle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Compare = () => {
  const { productName } = useParams<{ productName: string }>();
  const location = useLocation();
  const [imageError, setImageError] = useState(false);

  const stateProduct = location.state?.product as Product | undefined;

  const baseProduct = useMemo(() => {
    if (stateProduct) return stateProduct;
    
    const decodedName = decodeURIComponent(productName || '');
    return allProducts.find(p => p.productName === decodedName);
  }, [stateProduct, productName]);

  const similarProducts = useMemo(() => {
    if (!baseProduct) return [];
    return getSimilarProducts(baseProduct);
  }, [baseProduct]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Compare prices for ${baseProduct?.productName}`,
          url,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Link copied!',
        description: 'The comparison link has been copied to your clipboard.',
      });
    }
  };

  if (!baseProduct) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <AlertTriangle className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-foreground">
            Product not found
          </h1>
          <p className="mb-6 text-muted-foreground">
            We couldn't find the product you're looking for.
          </p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        {/* Back Button */}
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-6"
        >
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Link>
        </Button>

        {/* Product Header */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start animate-fade-up">
          {/* Product Image */}
          <div className="flex h-32 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            {!imageError ? (
              <img
                src={baseProduct.productImageURL}
                alt={baseProduct.productName}
                className="h-28 w-28 object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <ImageOff className="h-12 w-12 text-muted-foreground/50" />
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <span className="mb-1 inline-block text-xs font-medium uppercase tracking-wide text-primary">
              {baseProduct.category}
            </span>
            <h1 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              {baseProduct.productName}
            </h1>
            <p className="text-muted-foreground">
              Compare prices across {similarProducts.length} retailer{similarProducts.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Share Button */}
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        {/* Comparison Table */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Price Comparison
          </h2>
          {similarProducts.length > 0 ? (
            <ComparisonTable products={similarProducts} />
          ) : (
            <div className="rounded-xl border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">
                No other retailers found for this product.
              </p>
            </div>
          )}
        </div>

        {/* Legal Disclaimer */}
        <div className="rounded-xl border border-border bg-muted/50 p-4">
          <p className="text-xs text-muted-foreground">
            <strong>Disclaimer:</strong> Prices may vary. Data sourced via publicly accessible online product listings. 
            We recommend verifying prices on the retailer's website before making a purchase. 
            PriceCompare SA is not responsible for any discrepancies in pricing or product availability.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Compare;
