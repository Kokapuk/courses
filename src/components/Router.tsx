import GlobalLayout from '@/layouts/GlobalLayout';
import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

const Courses = lazy(() => import('@/routes/Courses'));
const Auth = lazy(() => import('@/routes/Auth'));

const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {
        path: '/',
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
