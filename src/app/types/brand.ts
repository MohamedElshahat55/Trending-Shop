export interface BrandDto {
  data: Brand[];
}
export interface Brand {
  _id: string;
  name: string;
  image: string;
  slug: string;
}
