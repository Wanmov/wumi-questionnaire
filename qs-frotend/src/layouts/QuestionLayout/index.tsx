import { useVerifyNav } from '@/hooks/useVerifyNav';
import { Outlet } from 'react-router-dom';

const QuestionLayout: React.FC = () => {
  useVerifyNav();
  return (
    <div style={{ height: '100vh' }}>
      <Outlet />
    </div>
  );
};

export default QuestionLayout;
