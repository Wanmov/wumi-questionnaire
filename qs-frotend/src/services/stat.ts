import request, { ResDataType } from '../utils/request';

export async function reqGetQuestionStatList(
  questionId: string,
  params: { page: number; pageSize: number }
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}`;
  const data = await request.get(url, { params });
  return data;
}

export async function reqGetCompStat(questionId: string, componentId: string): Promise<ResDataType> {
  const url = `/api/stat/${questionId}/${componentId}`;
  const data = await request.get(url);
  return data;
}
