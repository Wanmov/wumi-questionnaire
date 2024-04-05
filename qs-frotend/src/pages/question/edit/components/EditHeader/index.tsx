import { Button, Input, Space, Typography, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/store';
import { ChangeEvent, useState } from 'react';
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { setPageInfoState } from '@/store/modules/pageReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { useKeyPress, useRequest } from 'ahooks';
import { updateQuestionState } from '@/services/question';
import EditToolbar from '../EditToolbar';
import styles from './index.module.scss';

const { Title } = Typography;

const TitleElem: React.FC = () => {
  const { title } = useSelector((state: AppState) => state.page);
  const dispatch = useDispatch();

  const [editState, SetEditState] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    dispatch(setPageInfoState({ title: newTitle }));
  };

  return editState ? (
    <Input
      value={title}
      onChange={handleChange}
      onPressEnter={() => SetEditState(false)}
      onBlur={() => SetEditState(false)}
    />
  ) : (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => SetEditState(true)} />
    </Space>
  );
};

const SaveButton: React.FC = () => {
  const { id } = useParams();
  const { componentList } = useSelector((state: AppState) => state.components.present);
  const pageInfo = useSelector((state: AppState) => state.page);

  const { loading, run: savePageInfo } = useRequest(updateQuestionState, {
    manual: true,
    onSuccess() {
      message.success('保存成功');
    }
  });

  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!loading) savePageInfo(id as string, { ...pageInfo, componentList });
  });

  /*useDebounceEffect(
    () => {
      savePageInfo(id as string, { ...pageInfo, componentList });
    },
    [componentList, pageInfo],
    {
      wait: 1000
    }
  );*/

  return (
    <Button
      onClick={() => savePageInfo(id as string, { ...pageInfo, componentList })}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  );
};

const PublishButton: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { componentList } = useSelector((state: AppState) => state.components.present);
  const pageInfo = useSelector((state: AppState) => state.page);

  const { loading, run: publish } = useRequest(
    async () => {
      if (id) {
        await updateQuestionState(id, {
          ...pageInfo,
          componentList,
          isPublished: true
        });
      }
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功');
        navigate('/question/stat/' + id); // 发布成功，跳转到统计页面
      }
    }
  );

  return (
    <Button type="primary" onClick={publish} disabled={loading}>
      发布
    </Button>
  );
};

const EditHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.toolsBox}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
