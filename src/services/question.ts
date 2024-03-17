import request, { ResDataType } from '../utils/request';

export async function getQuestionCard(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = await request.get(url);
  return data;
}

export async function createQuestion(): Promise<ResDataType> {
  const url = `/api/question`;
  const data = await request.post(url);
  return data;
}
