import './App.css';
import {
  Form, Spin, Input, Button, Tag,
} from 'antd';
import { useState } from 'react';

function TitleArea({ faceId }) {
  return (
    <div style={{ marginBottom: '50px', textAlign: 'center' }}>
      <h1>Welcome</h1>
      <p style={{ fontSize: '1rem' }}>
        You have a new visiter with face ID:&nbsp;
        <Tag color="blue">
          {faceId}
        </Tag>
      </p>
      <p style={{ fontSize: '1rem' }}>
        You can fill in this form to grant him/her access or simply ignore
      </p>
    </div>
  )
}

function InputArea() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (values) => {
    console.log(values)
    setIsLoading(true)
    // TODO: implement submit function to backend
  }
  return (
    <Spin spinning={isLoading}>
      <div
        style={{
          padding: '50px 30px 10px 30px',
          border: '1px solid #40A9FF',
          borderRadius: '8px',
        }}
      >
        <Form
          onFinish={onSubmit}
          initialValues={{}}
        >
          <Form.Item
            label="Phone"
            name="phone"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
          >
            <Input />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              Submit
          </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
}

function App() {
  const urlParam = window.location.search;
  const urlParamContent = urlParam.slice(1) || '';
  const urlParamKey = urlParamContent.split('=')[0];
  const urlParamValue = urlParamContent.split('=')[1];
  if (urlParamKey !== 'faceId' || !urlParamValue) {
    alert('No faceId Specified!')
    return null
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: '60px'
      }}
    >
      <div
        style={{ width: 500 }}
      >
        <TitleArea faceId={urlParamValue} />
        <InputArea />
      </div>
    </div>
  );
}

export default App;
