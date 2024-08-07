import { Product } from './product';

export interface CartData {
  products: Product[];
  totalCartPrice: number;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface ApiResponse {
  status: string;
  numOfCartItems: number;
  data: CartData;
}
