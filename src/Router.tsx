import App from 'App';
import { createBrowserRouter } from 'react-router-dom';
import {
  CategoryPage,
  HashtagPage,
  LoginPage,
  MainPage,
  RestaurantCreatePage,
  RestaurantDetailPage,
  RestaurantMainPage,
} from './pages';
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, path: '/', element: <MainPage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'restaurant', element: <RestaurantMainPage /> },
        { path: 'restaurant/new', element: <RestaurantCreatePage /> },
        { path: 'restaurant/update/:id', element: <RestaurantCreatePage /> },
        { path: 'restaurant/:id', element: <RestaurantDetailPage /> },
        { path: 'hashtag', element: <HashtagPage /> },
        { path: 'category', element: <CategoryPage /> },
      ],
    },
  ],
  { basename: '/okivery-admin' }
);

export default router;
