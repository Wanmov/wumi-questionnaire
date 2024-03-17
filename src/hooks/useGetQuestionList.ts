import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY } from '../utils/constans';
import { getQuestionList } from '../services/question';

interface SearchParams {
  isStar: boolean;
  isDeleted: boolean;
}

export const useGetQuestionList = (params: Partial<SearchParams> = {}) => {
  const { isStar, isDeleted } = params;
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';

  const { data, loading, error } = useRequest(
    async () => {
      const res = await getQuestionList({ keyword, isStar, isDeleted });
      return res;
    },
    {
      refreshDeps: [searchParams]
    }
  );
  return { data, loading, error };
};
