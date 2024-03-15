import { Link } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../../../router/constans';

const UserInfo: React.FC = () => {
  return (
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </>
  );
};

export default UserInfo;
