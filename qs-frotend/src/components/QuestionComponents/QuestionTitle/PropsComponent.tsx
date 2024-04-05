import { Form, Input } from 'antd';

import { useEffect } from 'react';
import { QuestionTitleProps } from './component';

const PropsComponent: React.FC<QuestionTitleProps> = (props: QuestionTitleProps) => {
  const { text, level, textAlign, onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ text, level, textAlign });
  }, [text, level, textAlign]);

  const handleValuesChange = () => {
    if (onChange) onChange(form.getFieldsValue());
  };

  return (
    <Form
      layout="vertical"
      initialValues={{ text, level, textAlign }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disabled}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
