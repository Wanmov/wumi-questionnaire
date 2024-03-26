import { useDispatch, useSelector } from 'react-redux';
import { getCompConfigByType } from '../../../../../components/QuestionComponents';
import { ComponentItem, setCompState } from '../../../../../store/modules/compReducer';
import { AppState } from '../../../../../store';
import styles from './index.module.scss';
import classnames from 'classnames';
import { MouseEvent } from 'react';

const generateComp = (componentItem: ComponentItem) => {
  const { type, props } = componentItem;

  const componentConfig = getCompConfigByType(type);
  if (!componentConfig) return null;

  const { Component } = componentConfig;
  return <Component {...props} />;
};

interface EditCanvasProps {
  loading: boolean;
}

const EditCanvas: React.FC<EditCanvasProps> = ({ loading }) => {
  const { componentList, selectedId } = useSelector((state: AppState) => state.components.present);
  const dispatch = useDispatch();

  const handleClick = (event: any, id: string) => {
    event.stopPropagation();
    dispatch(setCompState({ selectedId: id }));
  };

  return (
    <div className={styles.canvas}>
      {componentList.map((comp) => {
        const { fe_id } = comp;
        return (
          <div
            key={fe_id}
            className={classnames(styles.componentWrapper, { [styles.selected]: fe_id === selectedId })}
            onClick={(e) => handleClick(e, fe_id)}>
            <div className={styles.component}>{generateComp(comp)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default EditCanvas;
