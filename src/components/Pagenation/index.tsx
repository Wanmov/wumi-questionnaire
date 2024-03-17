import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from 'antd';
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY } from '../../utils/constans';

interface PagenationProps {
  total: number;
}

const Pagenation: React.FC<PagenationProps> = (props) => {
  const { total } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
    setCurrent(page);
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;
    setPageSize(pageSize);
  }, [searchParams]);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  function handlePageChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());

    navigate({
      pathname,
      search: searchParams.toString() // 除了改变 page pageSize 之外，其他的 url 参数要带着
    });
  }

  return <Pagination current={current} pageSize={pageSize} total={total} onChange={handlePageChange} />;
};

export default Pagenation;
