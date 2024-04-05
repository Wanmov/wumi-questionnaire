import { Button, Checkbox, Form, Input, Space, Typography, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '@/router/constans';
import { Link, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';

import { login } from '../../services/user';
import { useEffect } from 'react';
import styles from './index.module.scss';

const { Title } = Typography;

const Login: React.FC = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    const username = localStorage.getItem('USERNAME');
    const password = localStorage.getItem('PASSWORD');
    form.setFieldsValue({ username, password });
  }, []);

  const navigate = useNavigate();

  const { run: runLogin } = useRequest(login, {
    manual: true,
    onSuccess: (res) => {
      const { token = '' } = res;
      localStorage.setItem('USER_TOKEN', token);
      message.success('登录成功');
      navigate(MANAGE_INDEX_PATHNAME);
    }
  });

  const onFinish = (values: any) => {
    const { username, password, remember } = values;
    runLogin({ username, password });
    if (remember) {
      localStorage.setItem('USERNAME', username);
      localStorage.setItem('PASSWORD', username);
    } else {
      localStorage.removeItem('USERNAME');
      localStorage.removeItem('PASSWORD');
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          form={form}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' }
            ]}>
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
