export type Retailer = 'Pick n Pay' | 'Checkers' | 'Shoprite' | 'Woolworths';

export interface Product {
  _id?: { $oid: string };
  productName: string;
  productURL: string;
  productImageURL: string;
  price: string;
  category: string;
  retailer: Retailer;
}

export interface ProductGroup {
  productName: string;
  category: string;
  retailers: {
    retailer: Retailer;
    price: number;
    priceString: string;
    productURL: string;
    productImageURL: string;
  }[];
  lowestPrice: number;
  highestPrice: number;
  savings: number;
}
