import { Product, ProductGroup, Retailer } from '@/types/product';
import productsData from '@/data/products.json';

export const products: Product[] = productsData as Product[];

export const parsePrice = (priceStr: string): number => {
  const cleaned = priceStr.replace(/[R,\s]/g, '');
  return parseFloat(cleaned) || 0;
};

export const formatPrice = (price: number): string => {
  return `R${price.toFixed(2)}`;
};

export const getCategories = (): string[] => {
  const categories = new Set(products.map(p => p.category));
  return Array.from(categories).sort();
};

export const getRetailerColor = (retailer: Retailer): { bg: string; text: string; border: string } => {
  const colors: Record<Retailer, { bg: string; text: string; border: string }> = {
    'Pick n Pay': { bg: 'bg-pnp-light', text: 'text-pnp', border: 'border-pnp/20' },
    'Checkers': { bg: 'bg-checkers-light', text: 'text-checkers', border: 'border-checkers/20' },
    'Shoprite': { bg: 'bg-shoprite-light', text: 'text-shoprite', border: 'border-shoprite/20' },
    'Woolworths': { bg: 'bg-woolworths-light', text: 'text-woolworths', border: 'border-woolworths/20' },
  };
  return colors[retailer] || { bg: 'bg-muted', text: 'text-foreground', border: 'border-border' };
};

export const normalizeProductName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export const getSimilarProducts = (product: Product): Product[] => {
  const normalizedName = normalizeProductName(product.productName);
  const keywords = normalizedName.split(' ').filter(w => w.length > 2);
  
  return products.filter(p => {
    if (p.category !== product.category) return false;
    const otherNormalized = normalizeProductName(p.productName);
    const matchCount = keywords.filter(k => otherNormalized.includes(k)).length;
    return matchCount >= Math.min(3, keywords.length - 1);
  });
};

export const groupSimilarProducts = (productList: Product[]): ProductGroup[] => {
  const groups: Map<string, Product[]> = new Map();
  
  productList.forEach(product => {
    const similar = getSimilarProducts(product);
    const key = similar
      .map(p => p.productName)
      .sort()
      .join('|||');
    
    if (!groups.has(key)) {
      groups.set(key, similar);
    }
  });

  return Array.from(groups.values()).map(group => {
    const retailers = group.map(p => ({
      retailer: p.retailer,
      price: parsePrice(p.price),
      priceString: p.price,
      productURL: p.productURL,
      productImageURL: p.productImageURL,
    })).sort((a, b) => a.price - b.price);

    const prices = retailers.map(r => r.price);
    const lowestPrice = Math.min(...prices);
    const highestPrice = Math.max(...prices);

    return {
      productName: group[0].productName,
      category: group[0].category,
      retailers,
      lowestPrice,
      highestPrice,
      savings: highestPrice - lowestPrice,
    };
  });
};

export const searchProducts = (query: string, category?: string): Product[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  return products.filter(p => {
    const matchesQuery = !normalizedQuery || 
      p.productName.toLowerCase().includes(normalizedQuery) ||
      p.category.toLowerCase().includes(normalizedQuery);
    
    const matchesCategory = !category || category === 'All' || p.category === category;
    
    return matchesQuery && matchesCategory;
  });
};

export const getUniqueProducts = (): Product[] => {
  const seen = new Map<string, Product>();
  
  products.forEach(product => {
    const key = normalizeProductName(product.productName) + product.category;
    if (!seen.has(key)) {
      seen.set(key, product);
    }
  });
  
  return Array.from(seen.values());
};
