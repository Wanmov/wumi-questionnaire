import { Button, Divider, Popconfirm, Space, Tag, message, Modal } from 'antd';
import styles from './index.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import { useRequest } from 'ahooks';
import { duplicateQuestion, updateQuestionState } from '@/services/question';

interface QuestionCardProps {
  _id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createAt: string;
}

const { confirm } = Modal;

const QuestionCard: React.FC<QuestionCardProps> = (props) => {
  const { _id, title, createAt, answerCount, isPublished, isStar } = props;
  const navigate = useNavigate();
  const [isStarState, setIsStarState] = useState(isStar);
  const [loading, setLoading] = useState<boolean>(false);

  const { loading: changeStarLoading, run: runChangeStarState } = useRequest(updateQuestionState, {
    manual: true,
    onSuccess: (res) => {
      setIsStarState(!isStarState);
      message.success('已更新');
    }
  });

  const { loading: duplicateLoading, run: runDuplicateQuestion } = useRequest(duplicateQuestion, {
    manual: true,
    onSuccess: (res) => {
      message.success('复制成功');
      navigate(`/question/edit/${res.id}`);
    }
  });

  const [isDeletedState, setIsDeletedState] = useState(false);
  const { loading: deleteLoading, run: runDeleteQuestion } = useRequest(updateQuestionState, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功');
      setIsDeletedState(true);
    }
  });

  const deleteCard = () => {
    confirm({
      title: '确定删除该问卷',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        runDeleteQuestion(_id, { isDeleted: true });
      }
    });
  };
  return isDeletedState ? null : (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <div>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            {isStarState && <StarOutlined style={{ color: 'yellow', marginRight: 8 }} />}
            {title}
          </Link>
        </div>
        <div>
          {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
          <span>答卷: {answerCount}</span>
          <span>{createAt}</span>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles.options}>
        <div className={styles.leftOpBox}>
          <Space>
            <Button icon={<EditOutlined />} type="text" size="small" onClick={() => navigate(`/question/edit/${_id}`)}>
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => navigate(`/question/stat/${_id}`)}
              disabled={!isPublished}>
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.rightOpBox}>
          <Space>
            <Button
              type="text"
              icon={<StarOutlined />}
              size="small"
              onClick={() => runChangeStarState(_id, { isStar: !isStarState })}
              disabled={changeStarLoading}>
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制该问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => runDuplicateQuestion}
              disabled={duplicateLoading}>
              <Button type="text" icon={<CopyOutlined />} size="small">
                复制
              </Button>
            </Popconfirm>
            <Button type="text" icon={<DeleteOutlined />} size="small" onClick={deleteCard} disabled={deleteLoading}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
