import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_SEARCH_PARAM_KEY
} from '../utils/constans';
import { getQuestionList } from '../services/question';

interface SearchParams {
  isStar: boolean;
  isDeleted: boolean;
}

export const useGetQuestionList = (params: Partial<SearchParams> = {}) => {
  const { isStar, isDeleted } = params;
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
  const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
  const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const res = await getQuestionList({ keyword, isStar, isDeleted, page, pageSize });
      return res;
    },
    {
      refreshDeps: [searchParams]
    }
  );
  return { data, loading, error, refresh };
};
