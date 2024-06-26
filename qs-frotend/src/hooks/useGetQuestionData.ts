import { useRequest } from 'ahooks';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { reqGetQuestionById } from '@/services/question';
import { useEffect } from 'react';
import { setCompState } from '@/store/modules/compReducer';
import { setPageInfoState } from '@/store/modules/pageReducer';

export const useGetQuestionData = () => {
  const { id = '' } = useParams();
  const dispatch = useDispatch();

  const { data, loading, error } = useRequest(reqGetQuestionById, {
    refreshDeps: [id]
  });

  useEffect(() => {
    if (!data) return;
    const { title = '', desc = '', js = '', css = '', isPublished = false, componentList = [] } = data;

    let selectedId = componentList.length > 0 ? componentList[0].fe_id : '';
    dispatch(setCompState({ componentList, selectedId, copiedComponent: null }));
    dispatch(setPageInfoState({ title, desc, js, css, isPublished }));
  }, [data]);
  return { loading, error };
};
