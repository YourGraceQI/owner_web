import './App.css';
import {
  Form, Spin, Input, Button, Tag, message,
} from 'antd';
import { useState } from 'react';

const BACKEND_URL = 'https://ws0zvb23ge.execute-api.us-west-2.amazonaws.com/v1';;

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

function InputArea({ faceId }) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (values) => {
    console.log(values)
    setIsLoading(true)
    const data = {
      data: {
        name: values.name,
        phone: values.phone,
        faceId,
      },
    };
    const option = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch(BACKEND_URL, option)
      .then(response => {
        setIsLoading(false)
        if (response.status === 200) {
          return response.text();
        } else {
          return '{"errorType": "unknown error"}';
        }
      })
      .then(text => {
        let jsonData = {}
        try {
          jsonData = JSON.parse(text);
        } catch (error) {
          message.success('Succeed');
        }
        if (jsonData.errorType) {
          message.warning('Internal Error. Please contact admin.');
        } else {
          message.success('Succeed');
        }
      })
      .catch(reason => {
        message.error(`Error: ${reason}`);
      })

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
            required
            rules={[{
              required: true,
            }, {
              pattern: /^[0-9]{10}$/,
              message: 'Phone number must be 10-digit string'
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            required
            rules={[{
              required: true,
            }]}
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
    message.error('No faceId Specified!')
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
        <InputArea faceId={urlParamValue} />
      </div>
    </div>
  );
}

export default App;
