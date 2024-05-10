import App from 'App';
import { createBrowserRouter } from 'react-router-dom';
import { CategoryPage, HashtagPage, LoginPage, MainPage, RestaurantPage } from './pages';
const router = createBrowserRouter(
  [
    {
      path: '',
      element: <App />,
      children: [
        {
          index: true,
          path: '',
          element: <MainPage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'restaurant',
          element: <RestaurantPage />,
        },
        {
          path: 'hashtag',
          element: <HashtagPage />,
        },
        {
          path: 'category',
          element: <CategoryPage />,
        },
      ],
    },
  ],
  { basename: '/okivery-admin' }
);

export default router;
