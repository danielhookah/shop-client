import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import { FiltersContextProvider } from '@/contexts/FiltersContext';

/**
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <FiltersContextProvider>
        <Component {...pageProps} />
        <ToastContainer position='bottom-right' />
      </FiltersContextProvider>
    </>
  );
}

export default MyApp;
