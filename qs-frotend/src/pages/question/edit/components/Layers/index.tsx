import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/store';
import { Button, Input, Space, message } from 'antd';
import { changeCompHide, changeCompTitle, moveComp, setCompState, toggleCompLocked } from '@/store/modules/compReducer';
import SortableContainer from '@/components/DragSortable/SortableContainer';
import SortableItem from '@/components/DragSortable/SortableItem';
import classnames from 'classnames';
import styles from './index.module.scss';
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';

const Layers: React.FC = () => {
  const { componentList, selectedId } = useSelector((state: AppState) => state.components.present);
  const dispatch = useDispatch();

  // 记录当前正在修改标题的组件
  const [changingTitleId, setChangingTitleId] = useState('');

  const handleTitleClick = (fe_id: string) => {
    const curComp = componentList.find((comp) => comp.fe_id === fe_id);
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件');
      return;
    }
    if (fe_id !== selectedId) {
      dispatch(setCompState({ selectedId: fe_id }));
      setChangingTitleId('');
      return;
    }

    setChangingTitleId(fe_id);
  };

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim();
    if (!newTitle || !selectedId) return;

    dispatch(changeCompTitle({ fe_id: selectedId, title: newTitle }));
  };

  const changeHidden = (fe_id: string, isHidden: boolean) => {
    dispatch(changeCompHide({ fe_id, isHidden }));
  };

  const changeLocked = (fe_id: string) => {
    dispatch(toggleCompLocked({ fe_id }));
  };

  // 需要每个 item 都有 id
  const componentListWithId = componentList.map((comp) => {
    return { ...comp, id: comp.fe_id };
  });

  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComp({ oldIndex, newIndex }));
  };

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      {componentList.map((comp) => {
        const { fe_id, title, isHidden, isLocked } = comp;

        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styles.wrapper}>
              <div
                className={classnames(styles.title, { [styles.selected]: fe_id === selectedId })}
                onClick={() => handleTitleClick(fe_id)}>
                {fe_id === changingTitleId ? (
                  <Input
                    value={title}
                    onChange={changeTitle}
                    onPressEnter={() => setChangingTitleId('')}
                    onBlur={() => setChangingTitleId('')}
                  />
                ) : (
                  title
                )}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    className={classnames({ [styles.btn]: !isHidden })}
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? 'primary' : 'text'}
                    onClick={() => changeHidden(fe_id, !isHidden)}
                  />
                  <Button
                    size="small"
                    shape="circle"
                    className={classnames({ [styles.btn]: !isLocked })}
                    icon={<LockOutlined />}
                    type={isLocked ? 'primary' : 'text'}
                    onClick={() => changeLocked(fe_id)}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        );
      })}
    </SortableContainer>
  );
};

export default Layers;
