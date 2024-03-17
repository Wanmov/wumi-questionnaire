import request, { ResDataType } from '../utils/request';

interface SearchOptions {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
}

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

export async function getQuestionList(opt: Partial<SearchOptions> = {}): Promise<ResDataType> {
  const url = `/api/question`;
  const data = await request.get(url, { params: opt });
  return data;
}
