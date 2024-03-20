import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../store';
import { getCompConfigByType } from '../../../../../components/QuestionComponents';

const NoProp: React.FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>;
};

const ComponentProps: React.FC = () => {
  const dispatch = useDispatch();
  const { componentList, selectedId } = useSelector((state: AppState) => state.component);

  const selectedComponent = componentList.find((comp) => comp.fe_id === selectedId);
  if (selectedComponent == null) return <NoProp />;
  const { type, props } = selectedComponent;

  const componentConfig = getCompConfigByType(type);
  if (componentConfig == null) return <NoProp />;

  const changeProps = () => {};

  const { PropsComponent } = componentConfig;
  return <PropsComponent {...props} onChange={changeProps} />;
};

export default ComponentProps;
