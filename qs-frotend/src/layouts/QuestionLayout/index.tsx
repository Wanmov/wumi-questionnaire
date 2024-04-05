import { useVerifyNav } from '@/hooks/useVerifyNav';
import { reqGetUSerInfo } from '@/services/user';
import { AppState } from '@/store';
import { setUserState } from '@/store/modules/userReducer';
import { useRequest } from 'ahooks';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const QuestionLayout: React.FC = () => {
  const dispatch = useDispatch();
  const [waitData, setWaitData] = useState(true);
  const { run: getUserInfo } = useRequest(reqGetUSerInfo, {
    manual: true,
    onSuccess: (res) => {
      const { username, nickname } = res;
      dispatch(setUserState({ username, nickname }));
    }
  });

  const { username } = useSelector((state: AppState) => state.user);

  useEffect(() => {
    if (username) {
      setWaitData(false);
      return;
    }
    getUserInfo();
  }, [username]);

  useVerifyNav(waitData);

  return (
    <div style={{ height: '100vh' }}>
      {waitData ? (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Spin />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default QuestionLayout;
