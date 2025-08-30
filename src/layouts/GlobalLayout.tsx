import { store } from '@/app/store';
import Header from '@/components/Header';
import RouteSpinner from '@/components/RouteSpinner';
import { Provider as ChakraProvider } from '@/ui/provider';
import { Toaster } from '@/ui/toaster';
import { Suspense } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Outlet, useNavigation } from 'react-router';

export default function GlobalLayout() {
  const navigation = useNavigation();

  return (
    <ReduxProvider store={store}>
      <ChakraProvider forcedTheme="dark">
        <Toaster />

        <Header />
        <main>
          {navigation.state === 'loading' ? (
            <RouteSpinner />
          ) : (
            <Suspense fallback={<RouteSpinner />}>
              <Outlet />
            </Suspense>
          )}
        </main>
      </ChakraProvider>
    </ReduxProvider>
  );
}
