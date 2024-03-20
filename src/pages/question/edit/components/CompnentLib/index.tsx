import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { ComponentConfig, componentConfigGroup } from '../../../../../components/QuestionComponents';
import { addComponent } from '../../../../../store/modules/compReducer';
import { Typography } from 'antd';
import styles from './index.module.scss';

const { Title } = Typography;

const generatorComp = (comp: ComponentConfig) => {
  const { title, type, Component, defaultProps } = comp;
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps
      })
    );
  }, []);

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.componentGrpi}>
        <Component />
      </div>
    </div>
  );
};

const ComponentLib: React.FC = () => {
  return (
    <>
      {componentConfigGroup.map((group, index) => {
        const { groupId, groupName, components } = group;

        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div>{components.map((comp) => generatorComp(comp))}</div>
          </div>
        );
      })}
    </>
  );
};

export default ComponentLib;
