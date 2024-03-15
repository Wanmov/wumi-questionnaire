import { useState } from 'react';
import styles from './index.module.scss';
import { Button, Empty, Modal, Space, Table, Tag, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ListSearch from '../../../components/ListSearch';

const { Title } = Typography;
const { confirm } = Modal;

const rowQuestionList = [
  { _id: 'q1', title: '问卷1', isPublished: false, isStar: true, answerCount: 0, createAt: '3月10日 16:10' },
  { _id: 'q2', title: '问卷2', isPublished: true, isStar: false, answerCount: 5, createAt: '3月13日 17:20' },
  { _id: 'q3', title: '问卷3', isPublished: false, isStar: true, answerCount: 3, createAt: '3月14日 18:15' },
  { _id: 'q4', title: '问卷4', isPublished: true, isStar: false, answerCount: 1, createAt: '4月10日 19:30' }
];

const Trash: React.FC = () => {
  const [questionList, setQuestionList] = useState([...rowQuestionList]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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

  const recover = () => {};

  const deleteQuestionnaire = () => {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: () => {}
    });
  };

  const TrashTable = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={deleteQuestionnaire}>
            彻底删除
          </Button>
        </Space>
      </div>
      <div style={{ border: '1px solid #e8e8e8' }}>
        <Table
          dataSource={questionList}
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
      <div className={styles.listContainer}>
        {questionList.length > 0 ? TrashTable : <Empty description="暂无数据" />}
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default Trash;
