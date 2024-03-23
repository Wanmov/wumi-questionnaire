import { useEffect } from 'react';
import { Form, Input } from 'antd';
import { QuestionInfoProps } from './component';

const { TextArea } = Input;

const PropComponent: React.FC<QuestionInfoProps> = (props) => {
  const { title, desc, onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, desc });
  }, [title, desc]);

  const handleValuesChange = () => {
    if (onChange) onChange(form.getFieldsValue());
  };

  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
      form={form}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入问卷标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
