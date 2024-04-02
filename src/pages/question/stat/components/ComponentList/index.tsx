import { useSelector } from 'react-redux';
import { getCompConfigByType } from '../../../../../components/QuestionComponents';
import { AppState } from '../../../../../store';
import styles from './index.module.scss';
import classnames from 'classnames';

interface ComponentListProps {
  seleCompId: string;
  setSeleCompId: (id: string) => void;
  setSeleCompType: (type: string) => void;
}

const ComponentList: React.FC<ComponentListProps> = (props) => {
  const { seleCompId, setSeleCompId, setSeleCompType } = props;
  const { componentList } = useSelector((state: AppState) => state.components.present);

  return (
    <div className={styles.container}>
      {componentList
        .filter((comp) => !comp.isHidden)
        .map((comp) => {
          const { fe_id, props, type } = comp;

          const compConfig = getCompConfigByType(type);
          if (!compConfig) return null;
          const { Component } = compConfig;
          return (
            <div
              className={classnames(styles.componentWrapper, { [styles.selected]: fe_id === seleCompId })}
              key={fe_id}
              onClick={() => {
                setSeleCompId(fe_id);
                setSeleCompType(type);
              }}>
              <div className={styles.component}>
                <Component {...props}></Component>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ComponentList;
