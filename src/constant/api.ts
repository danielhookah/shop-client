import * as process from 'process';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const CATEGORIES = BASE_URL + 'categories';
export const ATTRIBUTES = BASE_URL + 'attributes';
export const PRODUCTS = BASE_URL + 'products';
