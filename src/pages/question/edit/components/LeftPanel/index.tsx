import { Tabs } from 'antd';
import ComponentLib from '../CompnentLib';
import Layers from '../Layers';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';

const LeftPanel: React.FC = () => {
  const tabsItems = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined />
          组件库
        </span>
      ),
      children: <ComponentLib />
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: <Layers />
    }
  ];
  return <Tabs defaultActiveKey="componentLib" items={tabsItems} />;
};

export default LeftPanel;
