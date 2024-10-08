import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import DetailPost from '../pages/DetailPost';
import { ProtectedRoute } from './ProtectedRoute';
import MyPage from '../pages/MyPage';
import NewPost from '../pages/NewPost';
import EditPost from '../pages/EditPost';
import { useContext } from 'react';
import { UserContext } from '../context/UserContextProvider';

import Layout from '../components/Layout'; // 지영추가

const Router = () => {
  const { user } = useContext(UserContext);

  const publicRoutes = [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/detailpost/:id',
      element: <DetailPost />
    }
  ];

  // 로그인하지 않은(인증되지 않은) 사용자 전용 라우트
  const routesForNotAuthenticatedOnly = [
    {
      path: '/signin',
      element: <SignIn />
    },
    {
      path: '/signup',
      element: <SignUp />
    }
  ];
  const routesForAuthenticatedOnly = [
    {
      path: '/auth',
      element: <ProtectedRoute />,
      children: [
        {
          path: 'mypage',
          element: <MyPage />
        },
        {
          path: 'newpost',
          element: <NewPost />
        },
        {
          path: 'editpost/:id',
          element: <EditPost />
        }
      ]
    }
  ];
  const notFound = {
    path: '*',
    element: <Navigate to="/" />
  };
  // createBrowserRouter로 라우터 생성
  // createBrowserRouter: 라우터를 정의하는 기본 함수, 여러 그룹의 라우트를 한 번에 관리할 수 있게 함
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        // 라우트 설정들
        ...publicRoutes,
        ...routesForAuthenticatedOnly, // user가 true일 때 Home이 보여짐 + Protected Routes를 구현함 (경로를 찾을 때 위에서부터 확인 따라서 먼저 보이는 인증된 사용자용 "/"로 이동하는 것)
        ...(!user ? routesForNotAuthenticatedOnly : []), // user가 false일 때 라우트에 포함되고, 아니라면 빈 배열
        notFound
      ]
    }
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
