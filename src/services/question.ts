import request, { ResDataType } from '../utils/request';

interface SearchOptions {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
}

export async function reqGetQuestionById(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = await request.get(url);
  return data;
}

export async function createQuestion(): Promise<ResDataType> {
  const url = `/api/question`;
  const data = await request.post(url);
  return data;
}

export async function getQuestionList(opt: Partial<SearchOptions> = {}): Promise<ResDataType> {
  const url = `/api/question`;
  const data = await request.get(url, { params: opt });
  return data;
}

export async function updateQuestionState(id: string, opt: any): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = await request.patch(url, opt);
  return data;
}

export async function duplicateQuestion(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`;
  const data = await request.post(url);
  return data;
}

export async function deleteQuestion(ids: string[]): Promise<ResDataType> {
  const url = '/api/question';
  const data = await request.delete(url, { data: { ids } });
  return data;
}
