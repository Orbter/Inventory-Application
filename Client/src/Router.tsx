import { RouterProvider } from 'react-router-dom';
import { router } from '@/utils/routes/router';

function Router() {
  return <RouterProvider router={router} />;
}
export default Router;
