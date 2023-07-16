import * as React from 'react';
import { Category } from '@/services/category';
import Link from 'next/link';
import cn from 'clsx';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Attribute } from '@/services/attribute';
import Checkbox from '@/components/checkbox';
import { useFiltersContext } from '@/contexts/FiltersContext';

interface Sidebar {
  categories: Category[];
  attributes: Attribute[];
}

interface ItemProps {
  label: string;
  route: string;
  isActive: boolean;
}

const Item: FC<ItemProps> = ({ route, label, isActive }) => {
  const itemClassName = cn('uppercase', {
    'text-primary-800 font-bold': isActive,
  });

  return (
    <Link href={route} key={label} className={itemClassName}>
      {label}
    </Link>
  );
};

const Sidebar: FC<Sidebar> = ({ categories, attributes }) => {
  const router = useRouter();
  const { selectedAttributes, setSelectedCategory, setSelectedAttributes } =
    useFiltersContext();
  const { slug } = router.query;

  const selectedCategoryId = categories.filter((el) => el.name === slug)[0]?.id;
  const filteredAttributes = selectedCategoryId
    ? attributes.reduce<{ [key: string]: Attribute[] }>((acc, curr) => {
        if (curr.categoryId !== selectedCategoryId) return acc;
        if (!acc[curr.name]) acc[curr.name] = [];
        acc[curr.name].push(curr);
        return acc;
      }, {})
    : {};

  useEffect(() => {
    // ?&list_b[]=1&list_b[]=2&list_b[]=3&list_c=1,2,3
    const query = selectedAttributes
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
      .reduce<string>((acc, curr, currentIndex) => {
        if (!acc.includes(curr.name)) {
          acc = acc + (currentIndex === 0 ? '' : '&') + curr.name + '=';
        }
        acc +=
          selectedAttributes.length - 1 === currentIndex
            ? `${curr.value}`
            : `${curr.value},`;
        return acc;
      }, '')
      .replaceAll(',&', '&');

    slug &&
      router.push(
        {
          pathname: `/${slug}`,
          query,
        },
        undefined,
        { shallow: true }
      );
  }, [selectedAttributes]);

  useEffect(() => {
    setSelectedAttributes([]);
    setSelectedCategory(slug?.toString() || '');
  }, [slug]);

  useEffect(() => {
    const attributesFromURL = router.asPath.split('?')?.[1]?.split('&');
    const data: Attribute[] = [];
    attributesFromURL?.forEach((el) => {
      const [name, values] = el.split('=');
      const stringValues = values.split(',');
      filteredAttributes[name].forEach(
        (el) => stringValues.includes(el.value) && data.push(el)
      );
    });
    setSelectedAttributes(data);
  }, []);

  const getAttributeFilters = () =>
    Object.entries(filteredAttributes).map(([key, val]) => (
      <div key={key}>
        <p className='my-1 font-bold capitalize'>{key}</p>
        {val.map((valEl) => (
          <Checkbox
            checked={selectedAttributes.includes(valEl)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedAttributes((prevState) => {
                  return [...prevState, valEl];
                });
                return;
              }
              setSelectedAttributes((prevState) =>
                prevState.filter((el) => el.value !== valEl.value)
              );
            }}
            className='my-1'
            key={`${key}_${valEl.value}`}
            label={valEl.value}
          />
        ))}
      </div>
    ));

  return (
    <nav className='min-h-main flex min-w-[160px] flex-col bg-white px-5 py-3 pt-12'>
      {categories.map((el) => (
        <div
          className='bg-blue-500 mb-3 transition duration-200 ease-in-out hover:scale-105'
          key={el.id}
        >
          <Item label={el.name} route={el.name} isActive={el.name === slug} />
        </div>
      ))}
      {selectedCategoryId && getAttributeFilters()}
    </nav>
  );
};

export default Sidebar;
