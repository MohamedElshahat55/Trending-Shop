import { Brand } from './brand';
import { Category } from './category';

export interface ProductDto {
  data: Product[];
  results: number;
  metadata: {
    currentPage: number;
    limit: number;
    nextPage: number;
    numberOfPages: number;
  };
}

export interface Product {
  id: string;
  imageCover: string;
  slug: string;
  quantity: number;
  ratingsAverage: number;
  category: Category;
  creationAt: string;
  description: string;
  images: string[];
  price: number;
  title: string;
  brand: Brand;
  count?: number;
  numOfCartItems?: number | null;
}
