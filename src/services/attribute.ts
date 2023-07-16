import { ATTRIBUTES } from '@/constant/api';

export type Attribute = {
  id: string;
  name: string;
  value: string;
  categoryId: string;
};

export type IFetchAttributes = [Attribute[], string | null];

export const fetchAttributes = async (): Promise<IFetchAttributes> => {
  try {
    const res = await fetch(ATTRIBUTES);
    return [await res.json(), null];
  } catch (e: any) {
    return [[], e.message];
  }
};
