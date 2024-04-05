import { useState } from 'react';
import styles from './index.module.scss';
import { Button, Empty, Modal, Space, Table, Tag, Typography, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ListSearch from '@/components/ListSearch';
import { useGetQuestionList } from '@/hooks/useGetQuestionList';
import { useRequest } from 'ahooks';
import { deleteQuestion, updateQuestionState } from '@/services/question';

const { Title } = Typography;
const { confirm } = Modal;

const Trash: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { data = {}, loading, refresh } = useGetQuestionList({ isStar: true });
  const { list = [], total = 0 } = data;

  const columns = [
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>;
      }
    },
    {
      title: '答卷数',
      dataIndex: 'answerCount'
    },
    {
      title: '创建时间',
      dataIndex: 'createAt'
    }
  ];

  const { run: runRecover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionState(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess: () => {
        message.success('恢复成功');
        refresh();
        setSelectedIds([]);
      }
    }
  );

  const { run: runDeleteQuestion } = useRequest(deleteQuestion, {
    manual: true,
    onSuccess: () => {
      message.success('删除成功');
      refresh();
      setSelectedIds([]);
    }
  });

  const deleteThoroughly = () => {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: () => {
        runDeleteQuestion(selectedIds);
      }
    });
  };

  const TrashTable = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={runRecover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={deleteThoroughly}>
            彻底删除
          </Button>
        </Space>
      </div>
      <div style={{ border: '1px solid #e8e8e8' }}>
        <Table
          dataSource={list}
          columns={columns}
          pagination={false}
          rowKey={(q) => q._id}
          rowSelection={{
            type: 'checkbox',
            onChange: (selectedRowKeys) => {
              setSelectedIds(selectedRowKeys as string[]);
            }
          }}
        />
      </div>
    </>
  );

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.searchBox}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.listContainer}>{list.length > 0 ? TrashTable : <Empty description="暂无数据" />}</div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default Trash;
