import { useDispatch, useSelector } from 'react-redux';
import { getCompConfigByType } from '@/components/QuestionComponents';
import { ComponentItem, moveComp, setCompState } from '@/store/modules/compReducer';
import { AppState } from '@/store';
import classnames from 'classnames';
import { useToolsShortcutKeys } from '@/hooks/useToolsShortcutKeys';
import SortableContainer from '@/components/DragSortable/SortableContainer';
import SortableItem from '@/components/DragSortable/SortableItem';
import styles from './index.module.scss';

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

  useToolsShortcutKeys();

  const compListWithId = componentList.map((comp) => {
    return { ...comp, id: comp.fe_id };
  });

  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComp({ oldIndex, newIndex }));
  };

  return (
    <SortableContainer items={compListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter((comp) => !comp.isHidden)
          .map((comp) => {
            const { fe_id, isLocked } = comp;
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  key={fe_id}
                  className={classnames(styles.componentWrapper, {
                    [styles.selected]: fe_id === selectedId,
                    [styles.locked]: isLocked
                  })}
                  onClick={(e) => handleClick(e, fe_id)}>
                  <div className={styles.component}>{generateComp(comp)}</div>
                </div>
              </SortableItem>
            );
          })}
      </div>
    </SortableContainer>
  );
};

export default EditCanvas;
