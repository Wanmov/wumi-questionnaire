import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppState } from '../store';
import { useEffect } from 'react';
import { LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '../router/constans';
import { isntAuthPage } from '../router';

export const useVerifyNav = () => {
  const { pathname } = useLocation();
  const { username } = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (username && [LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
      navigate(MANAGE_INDEX_PATHNAME);
      return;
    }

    if (isntAuthPage(pathname)) return;
    navigate(LOGIN_PATHNAME);
  }, [username, pathname]);
};
