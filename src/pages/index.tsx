import * as React from 'react';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
// import Vercel from '~/svg/Vercel.svg';
import Card from '@/components/Card';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Category, fetchCategories } from '@/services/category';
import { toast } from 'react-toastify';
import { getListLayout } from '@/components/layout/ListLayout';
import { fetchAttributes } from '@/services/attribute';
import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '@/services/product';
import { useFiltersContext } from '@/contexts/FiltersContext';

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales };
  console.log(1222);
  const [categories, categoriesError] = await fetchCategories();
  const [attributes, attributesError] = await fetchAttributes();

  return {
    props: {
      categories,
      categoriesError,
      attributes,
      attributesError,
    },
  };
}

export default function HomePage({
  categories,
  categoriesError,
  attributes,
  attributesError,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const error = categoriesError || attributesError;
  if (error) toast.error(error);

  const { selectedAttributes, selectedCategory } = useFiltersContext();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then((res) => setProducts(res[0]))
      .catch((err) => toast.error(err));
  }, [selectedAttributes, selectedCategory]);

  return (
    <Layout innerLayout={getListLayout({ categories, attributes })}>
      <div>
        <Seo templateTitle='Home' />

        <main>
          <section>
            <div className='relative grid grid-cols-3 gap-4 py-12 text-center'>
              {products.map((el) => (
                <Card key={el.id}>
                  <p>{el.name}</p>
                  <p>{el.description}</p>
                  <p>{el.price}</p>
                </Card>
              ))}
            </div>
          </section>

          <ButtonLink className='mt-6' href='/components' variant='light'>
            See all components
          </ButtonLink>

          <footer className='absolute bottom-2 text-gray-700'>Footer</footer>
        </main>
      </div>
    </Layout>
  );
}
