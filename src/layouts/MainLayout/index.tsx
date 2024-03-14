import { Outlet } from 'react-router-dom';
const MainLayout: React.FC = () => {
  return (
    <>
      <div>Header</div>
      <div>
        <Outlet />
      </div>
      <div>Footer</div>
    </>
  );
};

export default MainLayout;
