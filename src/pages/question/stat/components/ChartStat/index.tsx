import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { Typography } from 'antd';
import { reqGetCompStat } from '../../../../../services/stat';
import { getCompConfigByType } from '../../../../../components/QuestionComponents';

const { Title } = Typography;

interface ChartStatProps {
  seleCompId: string;
  seleCompType: string;
}

const ChartStat: React.FC<ChartStatProps> = (props) => {
  const { seleCompId, seleCompType } = props;
  const { id = '' } = useParams();

  const [stat, setStat] = useState([]);
  const { run: getComponentStat } = useRequest(reqGetCompStat, {
    manual: true,
    onSuccess: (res) => {
      setStat(res.stat);
    }
  });

  useEffect(() => {
    if (seleCompId) getComponentStat(id, seleCompId);
  }, [id, seleCompId]);

  // 生成统计图表
  const generateStatElem = () => {
    if (!seleCompId) return <div>未选中组件</div>;

    const StatComponent = getCompConfigByType(seleCompType)?.StatComponent;
    return StatComponent ? <StatComponent stat={stat} /> : <div>该组件无统计图表</div>;
  };

  return (
    <>
      <Title level={3}>图表统计</Title>
      <div>{generateStatElem()}</div>
    </>
  );
};

export default ChartStat;
