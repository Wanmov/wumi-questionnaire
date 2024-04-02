import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pagination, Spin, Table, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useRequest } from 'ahooks';
import { reqGetQuestionStatList } from '../../../../../services/stat';
import { STAT_PAGE_SIZE } from '../../../../../utils/constans';
import { AppState } from '../../../../../store';

const { Title } = Typography;

interface AnswerStatProps {
  seleCompId: string;
  setSeleCompId: (id: string) => void;
  setSeleCompType: (type: string) => void;
}

const AnswerStat: React.FC<AnswerStatProps> = (props) => {
  const { seleCompId, setSeleCompId, setSeleCompType } = props;

  const { id = '' } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);

  const { loading } = useRequest(() => reqGetQuestionStatList(id, { page, pageSize }), {
    refreshDeps: [id, page, pageSize],
    onSuccess: (res) => {
      const { total, list = [] } = res;
      setTotal(total);
      setList(list);
    }
  });

  const { componentList } = useSelector((state: AppState) => state.components.present);

  const columns = componentList.map((comp) => {
    const { fe_id, title, props = {}, type } = comp;

    const colTitle = props!.title || title;

    return {
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSeleCompId(fe_id);
            setSeleCompType(type);
          }}>
          <span style={{ color: fe_id === seleCompId ? '#1890ff' : 'inherit' }}>{colTitle}</span>
        </div>
      ),
      dataIndex: fe_id
    };
  });

  const dataSource = list.map((i: any) => ({ ...i, key: i._id }));
  const TableElem = (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
      <div style={{ textAlign: 'center', marginTop: '18px' }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={(page) => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </>
  );

  return (
    <div>
      <Title level={3}>答卷数量: {!loading && total}</Title>
      {loading ? <Spin style={{ textAlign: 'center' }} /> : TableElem}
    </div>
  );
};

export default AnswerStat;
