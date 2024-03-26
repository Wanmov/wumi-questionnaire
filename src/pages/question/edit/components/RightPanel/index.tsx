import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ComponentProps from '../ComponentProps';
import { AppState } from '../../../../../store';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';

enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting'
}

const RightPanel: React.FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY);
  const { selectedId } = useSelector((state: AppState) => state.components.present);

  useEffect(() => {
    selectedId ? setActiveKey(TAB_KEYS.PROP_KEY) : setActiveKey(TAB_KEYS.SETTING_KEY);
  }, [selectedId]);

  const tabsItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProps />
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <div />
    }
  ];

  return <Tabs activeKey={activeKey} items={tabsItems}></Tabs>;
};

export default RightPanel;
