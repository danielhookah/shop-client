import { PRODUCTS } from '@/constant/api';

export type Product = {
  id?: string | number;
  name: string;
  description: string;
  availableCount: string;
  price: string;
  categoryId: string;
  attributes: string[];
  images: Blob[];
  imageUrls?: string[];
};

export type ProductFilters = {
  attributes?: string[];
  category?: string;
};

export type IFetchProducts = [Product[], string | null];

export const fetchProducts = async (
  filters?: ProductFilters
): Promise<IFetchProducts> => {
  const params = new URLSearchParams();
  filters?.attributes?.forEach((el) => {
    params.append('attributes', el);
  });
  filters?.category && params.append('categoryId', filters.category || '');

  try {
    const res = await fetch(PRODUCTS + '?' + params.toString());
    return [await res.json(), null];
  } catch (e: any) {
    return [[], e.message];
  }
};
