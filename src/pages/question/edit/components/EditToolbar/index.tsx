import { useDispatch, useSelector } from 'react-redux';
import {
  changeCompHide,
  copySelectedComp,
  pasteCopiedComp,
  removeSelectedComp,
  toggleCompLocked
} from '../../../../../store/modules/compReducer';
import { AppState } from '../../../../../store';
import { Button, Space, Tooltip } from 'antd';
import { BlockOutlined, CopyOutlined, DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';

const EditToolbar: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedId, copiedComponent, componentList } = useSelector((state: AppState) => state.components.present);

  const selectedComponent = componentList.find((comp) => comp.fe_id === selectedId);
  const { isLocked } = selectedComponent || {};

  const handleDelete = () => {
    dispatch(removeSelectedComp());
  };

  const handleHide = () => {
    dispatch(changeCompHide({ fe_id: selectedId, isHidden: true }));
  };

  const handleLock = () => {
    dispatch(toggleCompLocked({ fe_id: selectedId }));
  };

  const copy = () => {
    dispatch(copySelectedComp());
  };

  const paste = () => {
    dispatch(pasteCopiedComp());
  };

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHide}></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button shape="circle" icon={<BlockOutlined />} onClick={paste} disabled={copiedComponent == null}></Button>
      </Tooltip>
    </Space>
  );
};

export default EditToolbar;
