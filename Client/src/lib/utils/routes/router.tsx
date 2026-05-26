import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import RootLayout from '@/components/RootLayout';
import { Outlet } from 'react-router-dom';
import MainPage from '@/pages/Main-Page';
import TablePage from '@/pages/table-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RootLayout>
        <Outlet />
      </RootLayout>
    ),
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'table',
        element: <TablePage />,
      },
    ],
  },
]);
