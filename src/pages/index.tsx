import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
// import Vercel from '~/svg/Vercel.svg';
import Card from '@/components/Card';

const products = [
  {
    title: 'product 1',
    description: 'its a product 1',
    price: 100,
  },
  {
    title: 'product 2',
    description: 'its a product 2',
    price: 100,
  },
  {
    title: 'product 3',
    description: 'its a product 3',
    price: 100,
  },
];

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main>
        <section>
          <div className='relative grid grid-cols-3 gap-4 py-12 text-center'>
            {products.map((el) => (
              <Card key={el.title}>
                <p>{el.title}</p>
                <p>{el.description}</p>
                <p>{el.price}</p>
              </Card>
            ))}
          </div>
        </section>

        <ButtonLink className='mt-6' href='/components' variant='light'>
          See all components
        </ButtonLink>

        <footer className='absolute bottom-2 text-gray-700'>
          © {new Date().getFullYear()} By{' '}
          <UnderlineLink href='https://theodorusclarence.com?ref=tsnextstarter'>
            Theodorus Clarence
          </UnderlineLink>
        </footer>
      </main>
    </Layout>
  );
}
