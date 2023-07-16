import { CATEGORIES } from '@/constant/api';

export type Category = {
  id: string;
  name: string;
};

export type IFetchCategories = [Category[], string | null];

export const fetchCategories = async (): Promise<IFetchCategories> => {
  try {
    const res = await fetch(CATEGORIES);
    return [await res.json(), null];
  } catch (e: any) {
    return [[], e.message];
  }
};
