import type { NextApiRequest, NextApiResponse } from "next";
import { reqPostAnswer } from "@/services/answer";

function genAnswerInfo(reqBody: any) {
  const { questionId, ...rest } = reqBody;

  const answerList = Object.entries(rest).map(([componentId, value]) => ({
    componentId,
    value,
  }));

  return {
    questionId: reqBody.questionId || "",
    answerList,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(200).json({ errno: -1, msg: "Method 错误" });
  }

  // 格式化表单数据
  const answerInfo = genAnswerInfo(req.body);

  try {
    const resData = await reqPostAnswer(answerInfo);
    if (resData.errno === 0) {
      res.redirect("/success");
    } else {
      res.redirect("/fail");
    }
  } catch (err) {
    res.redirect("/fail");
  }
}
