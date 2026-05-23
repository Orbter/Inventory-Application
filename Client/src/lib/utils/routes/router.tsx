import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import RootLayout from '@/components/RootLayout';
import { Outlet } from 'react-router-dom';
import MainPage from '@/pages/Main-Page';
export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RootLayout>
        <Outlet />
        <MainPage />
      </RootLayout>
    ),
    children: [],
  },
]);
