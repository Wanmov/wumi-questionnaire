import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages';
import Login from '../pages/login';
import Register from '../pages/register';
import ManageLayout from '../layouts/ManageLayout';
import List from '../pages/manage/list';
import Edit from '../pages/question/edit';
import Stat from '../pages/question/stat';
import Star from '../pages/manage/star';
import Trash from '../pages/manage/trash';
import NotFound from '../pages/notFount';
import QuestionLayout from '../layouts/QuestionLayout';
import { HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME } from './constans';

// const Edit = lazy(() => import('../pages/question/edit'));
// const Stat = lazy(() => import('../pages/question/stat'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />
          },
          {
            path: 'star',
            element: <Star />
          },
          {
            path: 'trash',
            element: <Trash />
          }
        ]
      },
      {
        path: '*', // 404 路由配置，都写在最后（兜底）
        element: <NotFound />
      }
    ]
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />
      },
      {
        path: 'stat/:id',
        element: <Stat />
      }
    ]
  }
]);

export function isntAuthPage(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
}

export default router;
