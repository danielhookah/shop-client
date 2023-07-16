import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { fetchCategories } from '@/services/category';
import { toast } from 'react-toastify';
import Seo from '@/components/Seo';
import Card from '@/components/Card';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import * as React from 'react';
import { fetchAttributes } from '@/services/attribute';
import { getListLayout } from '@/components/layout/ListLayout';
import { useFiltersContext } from '@/contexts/FiltersContext';
import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '@/services/product';

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const [categories, categoriesError] = await fetchCategories();
  const [attributes, attributesError] = await fetchAttributes();
  return {
    props: {
      category: params?.slug,
      categories,
      categoriesError,
      attributes,
      attributesError,
    },
    revalidate: 200,
  };
}

export async function getStaticPaths() {
  // todo
  const [categories, categoriesError] = await fetchCategories();

  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default function Slug({
  category,
  categories,
  categoriesError,
  attributes,
  attributesError,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { selectedAttributes, selectedCategory } = useFiltersContext();
  const [products, setProducts] = useState<Product[]>([]);
  const error = categoriesError || attributesError;
  if (error) toast.error(error);

  const selectedCategoryId = categories.find((el) => el.name === category)?.id;
  const selectedCategoryAttributes = attributes.filter(
    (el) => el.categoryId === selectedCategoryId
  );

  useEffect(() => {
    fetchProducts({
      attributes: selectedAttributes.map((el) => el.id),
      category: categories.find((el) => el.name === selectedCategory)?.id,
    })
      .then((res) => setProducts(res[0]))
      .catch((err) => toast.error(err));
  }, [selectedAttributes, selectedCategory]);

  return (
    <Layout
      innerLayout={getListLayout({
        categories,
        attributes: selectedCategoryAttributes,
      })}
    >
      {router.isFallback ? (
        <h1>Loading...</h1>
      ) : (
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
      )}
    </Layout>
  );
}
