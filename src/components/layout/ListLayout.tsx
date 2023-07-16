import * as React from 'react';
import { Category } from '@/services/category';
import { Attribute } from '@/services/attribute';
import Sidebar from '@/components/layout/Sidebar';

interface ListLayout {
  children: React.ReactNode;
  sidebar: React.JSX.Element;
}

// todo
function ListLayout({ children, sidebar }: ListLayout) {
  return (
    <section className='layout flex'>
      <div className='ml-[-5.5%]'>{sidebar}</div>
      <div className='pl-7'>{children}</div>
    </section>
  );
}

export const getListLayout = ({
  categories,
  attributes,
}: {
  categories: Category[];
  attributes: Attribute[];
}) => {
  return (children: React.ReactNode) => (
    <ListLayout
      sidebar={<Sidebar categories={categories} attributes={attributes} />}
    >
      {children}
    </ListLayout>
  );
};
