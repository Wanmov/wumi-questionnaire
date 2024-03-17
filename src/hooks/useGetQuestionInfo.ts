import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionCard } from '../services/question';
import { useRequest } from 'ahooks';

export const useGetQuestionInfo = () => {
  const { id = '' } = useParams();

  const getQuestionInfo = async () => {
    const res = await getQuestionCard(id);
    return res;
  };

  const { loading, data, error } = useRequest(getQuestionInfo);

  return { loading, data, error };
};
