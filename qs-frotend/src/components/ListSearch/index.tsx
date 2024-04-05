import { Input } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY } from '@/utils/constans';

const { Search } = Input;

const ListSearch: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const newSearchText = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
    setSearchText(newSearchText);
  }, [searchParams]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearch = (value: string) => {
    navigate({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`
    });
  };

  return (
    <Search
      placeholder="输入关键字"
      value={searchText}
      onChange={handleChange}
      onSearch={handleSearch}
      allowClear
      style={{ width: 200 }}
    />
  );
};

export default ListSearch;
