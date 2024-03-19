import { useRequest } from 'ahooks';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { reqGetQuestionById } from '../services/question';
import { useEffect } from 'react';
import { setCompState } from '../store/modules/compReducer';

export const useGetQuestionData = () => {
  const { id = '' } = useParams();
  const dispatch = useDispatch();

  const { data, loading, error } = useRequest(reqGetQuestionById, {
    refreshDeps: [id]
  });

  useEffect(() => {
    if (!data) return;
    const { title = '', desc = '', js = '', css = '', isPublished = false, componentList = [] } = data;
    dispatch(setCompState({ componentList }));
  }, [data]);
  return { loading, error };
};
