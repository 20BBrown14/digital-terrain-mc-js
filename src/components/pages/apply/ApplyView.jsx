import React from 'react';
import {
  Input,
  InputNumber,
  Form,
  Select,
  Button,
} from 'antd';
import './Apply.css';

const onFormSubmit = (values) => {
  console.log(values);
  // submit app here
};

/**
 * Apply page view.
 */
const ApplyView = () => (
  <div className="apply-page-content">
    <h1 className="apply-page-title">Apply to Play on Digital Terrain</h1>
    <div className="apply-page-application-form">
      <Form onFinish={onFormSubmit} layout="vertical">
        <Form.Item
          label="In-game Name"
          name="in-game-name"
          rules={[
            {
              required: true,
              message: 'Please provide your in-game name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Discord Username"
          name="discord-username"
          rules={[
            {
              required: true,
              message: 'Please provide your discord username',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[
            {
              required: true,
              message: 'Please provide your age',
            },
          ]}
        >
          <InputNumber min={1} max={120} />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[
            {
              required: true,
              message: 'Please provide your location',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Why do you want to join Digital Terrain?"
          name="join-reasoning"
          rules={[
            {
              required: true,
              message: 'Please provide why you would like to join Digital Terrain',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="What is your ideal play style on Digital Terrain?"
          name="play-style"
          rules={[
            {
              required: true,
              message: 'Please provide your ideal play style on Digital Terrain',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="What do you like to do in your free time?"
          name="free-time"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="How did you hear about Digital Terrain?"
          name="source"
        >
          <Input.Group>
            <Select dropdownMatchSelectWidth={false} placeholder="Select an option">
              <Select.Option value="Reddit">Reddit</Select.Option>
              <Select.Option value="Discord">Discord</Select.Option>
              <Select.Option value="Twitch/Youtube">Twitch/Youtube</Select.Option>
              <Select.Option value="Friend">Friend</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
            <Input.TextArea defaultValue="If 'Friend' or 'Other' please provide specifics here" />
          </Input.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="apply-page-submit-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
);

export default ApplyView;
