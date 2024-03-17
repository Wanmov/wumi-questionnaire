import axios from 'axios';
import { message } from 'antd';

export interface ResDataType {
  [key: string]: any;
}

interface ResponseType {
  errno: number;
  data: ResDataType;
  msg: string;
}

const service = axios.create({
  timeout: 5000
});

service.interceptors.response.use((res) => {
  const resData = res.data;
  const { errno, data, msg } = resData;
  if (errno !== 0 && msg) {
    message.error(msg);
  }
  return data;
});

export default service;
