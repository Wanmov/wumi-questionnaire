import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/store';
import { useEffect } from 'react';
import { setPageInfoState } from '@/store/modules/pageReducer';

const { TextArea } = Input;

const PageSetting: React.FC = () => {
  const pageInfo = useSelector((state: AppState) => state.page);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);

  const handleValuesChange = () => {
    dispatch(setPageInfoState(form.getFieldsValue()));
  };

  return (
    <Form layout="vertical" initialValues={pageInfo} onValuesChange={handleValuesChange} form={form}>
      <Form.Item label="问卷标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder="问卷描述..." />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="输入 CSS 样式代码..." />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="输入 JS 脚本代码..." />
      </Form.Item>
    </Form>
  );
};

export default PageSetting;
