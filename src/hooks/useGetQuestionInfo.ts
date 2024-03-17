import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionCard } from '../services/question';

export const useGetQuestionInfo = () => {
  const { id = '' } = useParams();
  const [loading, setLoading] = useState(true);
  const [questionInfo, setQuestionInfo] = useState({});

  const getQuestionInfo = async () => {
    const res = await getQuestionCard(id);
    setQuestionInfo(res);
    setLoading(false);
  };

  useEffect(() => {
    getQuestionInfo();
  }, []);
  return { loading, questionInfo };
};
