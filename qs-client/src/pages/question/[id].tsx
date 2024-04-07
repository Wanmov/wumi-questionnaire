import PageWrapper from "@/components/PageWrapper";
import { reqGetQuestionById } from "@/services/question";
import { getComponent } from "@/components/QuestionComponents";
import styles from "@/styles/Question.module.scss";

interface QuestionProps {
  errno: number;
  data?: {
    id: string;
    title: string;
    desc?: string;
    js?: string;
    css?: string;
    isPublished: boolean;
    isDeleted: boolean;
    componentList: Array<any>;
  };
  msg?: string;
}

const RenderCompList = ({ componentList }: { componentList: Array<any> }) => {
  return (
    <>
      {componentList.map((comp) => {
        const ComponentElem = getComponent(comp);
        return (
          <div key={comp.fe_id} className={styles.componentWrapper}>
            {ComponentElem}
          </div>
        );
      })}
    </>
  );
};

export default function Question(props: QuestionProps) {
  const { errno, data, msg = "" } = props;

  if (errno !== 0) {
    return (
      <PageWrapper title="错误">
        <h1>错误</h1>
        <p>{msg}</p>
      </PageWrapper>
    );
  }

  const {
    id,
    title = "",
    desc = "",
    isDeleted,
    isPublished,
    componentList = [],
  } = data || {};

  if (isDeleted) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷已经被删除</p>
      </PageWrapper>
    );
  }

  if (!isPublished) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该问卷尚未发布</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={title} desc={desc}>
      <form method="post" action="/api/answer">
        <input type="hidden" name="questionId" value={id} />
        <RenderCompList componentList={componentList} />
        <div className={styles.submitBtnContainer}>
          <button type="submit">提交</button>
        </div>
      </form>
    </PageWrapper>
  );
}

export async function getServerSideProps(context: any) {
  const { id = "" } = context.params;
  const data = await reqGetQuestionById(id);

  return {
    props: data,
  };
}
