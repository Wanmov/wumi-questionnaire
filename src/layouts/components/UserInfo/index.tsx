import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../../../router/constans';
import { Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutReducer } from '../../../store/modules/userReducer';
import { AppState } from '../../../store';

const UserInfo: React.FC = () => {
  const navgate = useNavigate();
  const dispatch = useDispatch();
  const { username, nickname } = useSelector((state: AppState) => state.user);

  const handleQuitClick = () => {
    dispatch(logoutReducer());
    localStorage.removeItem('USER_TOKEN');
    message.success('退出成功');
    navgate(LOGIN_PATHNAME);
  };

  return username ? (
    <span>
      <UserOutlined />
      {nickname}
      <Button type="link" onClick={handleQuitClick}>
        退出
      </Button>
    </span>
  ) : (
    <Link to={LOGIN_PATHNAME}>登录</Link>
  );
};

export default UserInfo;
