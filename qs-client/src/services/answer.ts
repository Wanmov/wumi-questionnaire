import { post } from "./request";

export async function reqPostAnswer(answerInfo: any) {
  const url = "/api/answer";
  const data = await post(url, answerInfo);
  return data;
}
