import { store } from '@/app/store';
import Header from '@/components/Header';
import { Provider as ChakraProvider } from '@/ui/provider';
import { Toaster } from '@/ui/toaster';
import { Suspense } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Outlet } from 'react-router';

export default function GlobalLayout() {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider forcedTheme="dark">
        <Toaster />

        <Header />
        <main>
          <Suspense>
            <Outlet />
          </Suspense>
        </main>
      </ChakraProvider>
    </ReduxProvider>
  );
}
