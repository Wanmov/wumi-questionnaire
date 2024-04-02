import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { STAT_COLORS } from '../../../utils/constans';

function format(n: number) {
  return (n * 100).toFixed(2);
}

export interface QuestionRadioStatProps {
  stat: Array<{ name: string; count: number }>;
}

const StatComponent: React.FC<QuestionRadioStatProps> = ({ stat = [] }) => {
  const sum = useMemo(() => {
    return stat.reduce((acc, cur) => acc + cur.count, 0);
  }, [stat]);

  return (
    <div style={{ width: '300px', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            data={stat}
            cx="50%"
            cy="50%"
            outerRadius={50} // 饼图的直径
            fill="#8884d8"
            label={(i) => `${i.name}: ${format(i.count / sum)}%`}>
            {stat.map((i, index) => {
              return <Cell key={index} fill={STAT_COLORS[index]} />;
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatComponent;
