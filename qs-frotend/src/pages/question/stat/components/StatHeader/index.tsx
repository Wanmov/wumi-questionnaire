import { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input, InputRef, Popover, QRCode, Space, Tooltip, Typography, message } from 'antd';
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
import { AppState } from '@/store';
import styles from './index.module.scss';

const { Title } = Typography;

const StatHeader: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { title, isPublished } = useSelector((state: AppState) => state.page);

  // 拷贝链接
  const urlInputRef = useRef<InputRef>(null);
  const copyUrl = () => {
    const elem = urlInputRef.current?.input;
    if (!elem) return;
    navigator.clipboard.writeText(elem.value).then(() => {
      message.success('拷贝成功');
    });
  };

  const LinkAndQRCodeElem = useMemo(() => {
    if (!isPublished) return null;
    const url = `http://localhost:3001/question/${id}`;

    // 二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150} />
      </div>
    );

    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copyUrl}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    );
  }, [id, isPublished]);

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.shareContainer}>{LinkAndQRCodeElem}</div>
        <div className={styles.optionBox}>
          <Button type="primary" onClick={() => navigate(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
