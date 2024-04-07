import { get } from "./request";

export async function reqGetQuestionById(id: string) {
  const url = `/api/question/${id}`;
  const data = await get(url);
  return data;
}
