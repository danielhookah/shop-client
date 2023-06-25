import * as React from 'react';

import clsxm from '@/lib/clsxm';

type SkeletonProps = React.ComponentPropsWithoutRef<'div'>;

export default function Card({ className, ...rest }: SkeletonProps) {
  return (
    <div
      className={clsxm(
        'cursor-pointer rounded-lg bg-white p-6 drop-shadow-xl',
        className
      )}
      {...rest}
    />
  );
}
