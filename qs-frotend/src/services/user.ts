import request, { ResDataType } from '../utils/request';

export async function reqGetUSerInfo(): Promise<ResDataType> {
  const url = `/api/user/info`;
  const data = await request.get(url);
  return data;
}

export async function registerUser(params: any): Promise<ResDataType> {
  const url = `/api/user/register`;
  const data = await request.post(url, params);
  return data;
}

export async function login(params: any): Promise<ResDataType> {
  const url = `/api/user/login`;
  const data = await request.post(url, params);
  return data;
}
