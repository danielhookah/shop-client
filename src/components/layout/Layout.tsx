import * as React from 'react';

import Header from '@/components/layout/Header';
import { ReactNode } from 'react';

export default function Layout({
  children,
  innerLayout,
}: {
  children: ReactNode;
  innerLayout?: (children: ReactNode) => React.JSX.Element;
}) {
  return (
    <>
      <Header />
      {innerLayout ? (
        innerLayout(children)
      ) : (
        <div className='layout'>{children}</div>
      )}
    </>
  );
}
