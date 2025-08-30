import GlobalLayout from '@/layouts/GlobalLayout';
import { getCourses } from '@/utils/api';
import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import RouteSpinner from './RouteSpinner';

const Courses = lazy(() => import('@/routes/Courses'));
const Auth = lazy(() => import('@/routes/Auth'));

const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {
        path: '/',
        loader: () => {
          return getCourses();
        },
        hydrateFallbackElement: <RouteSpinner />,
        element: <Courses />,
      },
      {
        path: '/auth',
        element: <Auth />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
