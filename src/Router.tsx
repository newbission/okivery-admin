import App from 'App';
import { createBrowserRouter } from 'react-router-dom';
import {
  CategoryPage,
  HashtagPage,
  LoginPage,
  MainPage,
  RestaurantAddPage,
  RestaurantDetailPage,
  RestaurantMainPage,
  OrderMainPage,
  OrderListPage,
  NewOrderListPage,
} from './pages';
const router = createBrowserRouter(
  [
    {
      path: '',
      element: <App />,
      children: [
        { index: true, path: '/', element: <MainPage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'restaurant', element: <RestaurantMainPage /> },
        { path: 'restaurant/new', element: <RestaurantAddPage /> },
        { path: 'restaurant/update/:id', element: <RestaurantAddPage /> },
        { path: 'restaurant/:id', element: <RestaurantDetailPage /> },
        { path: 'order', element: <OrderMainPage /> },
        { path: 'order/list', element: <OrderListPage /> },
        { path: 'order/list/new', element: <NewOrderListPage /> },
        { path: 'hashtag', element: <HashtagPage /> },
        { path: 'category', element: <CategoryPage /> },
      ],
    },
  ],
  { basename: '/okivery-admin' }
);

export default router;
