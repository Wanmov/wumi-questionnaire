import { useSelector } from 'react-redux';
import { getCompConfigByType } from '../../../../../components/QuestionComponents';
import { ComponentItem } from '../../../../../store/modules/compReducer';
import { AppState } from '../../../../../store';

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
  const { componentList } = useSelector((state: AppState) => state.component);

  return (
    <div>
      {componentList.map((comp) => {
        const { fe_id } = comp;
        return (
          <div key={fe_id}>
            <div>{generateComp(comp)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default EditCanvas;
