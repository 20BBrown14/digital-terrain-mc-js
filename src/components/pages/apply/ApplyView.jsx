import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  InputNumber,
  Form,
  Select,
  Button,
  Typography,
  Space,
  Alert,
} from 'antd';
import './Apply.css';

const propTypes = {
  /* Function to handle form submission */
  handleFormSubmit: PropTypes.func.isRequired,
  /* Whether the form is loading submission */
  isLoading: PropTypes.bool.isRequired,
  /* Whether the submission failed */
  failedSubmission: PropTypes.bool.isRequired,
  /* Whether the submission succeeded */
  successfulSubmission: PropTypes.bool.isRequired,
  /* Function to handle the source dropdown change */
  handleSourceOptionChange: PropTypes.func.isRequired,
  /* Function to handle the source text change */
  handleSourceTextChange: PropTypes.func.isRequired,
};

/**
 * Apply page view.
 */
const ApplyView = (props) => {
  const {
    isLoading,
    handleFormSubmit,
    successfulSubmission,
    failedSubmission,
    handleSourceOptionChange,
    handleSourceTextChange,
  } = props;

  const buildSubmitAlert = () => (
    <>
      {successfulSubmission
          && <Alert message="Submission Successful, thank you!" type="success" showIcon closable />}
      {failedSubmission
          && <Alert message="Submission failed, please try again later." type="error" showIcon closable /> }
    </>
  );

  return (
    <div className="apply-page-content">
      <Space direction="vertical">
        <h1 className="apply-page-title">Apply to Play on Digital Terrain</h1>
        <Typography.Text className="apply-page-text">
          {'Thank you for considering playing on our server! Please fill\
          out this form and submit it with enough information for us to\
          properly evaluate if you will be a good fit for the server.\
          After we have had a chance to review your application we will\
          contact you through Discord @ your provided username. Please\
          ensure it is accurate before submitting. Your Discord username\
          should be in the format of AAAAA#0000 to ensure we can\
          contact you.'}
        </Typography.Text>
        <div className="apply-page-application-form">
          {buildSubmitAlert()}
          <Form onFinish={handleFormSubmit} layout="vertical">
            <Form.Item
              label="In-game Name"
              name="inGameName"
              rules={[
                {
                  required: true,
                  message: 'Please provide your in-game name',
                },
              ]}
            >
              <Input disabled={isLoading} />
            </Form.Item>
            <Form.Item
              label="Discord Username"
              name="discordUsername"
              rules={[
                {
                  required: true,
                  message: 'Please provide your discord username',
                },
              ]}
            >
              <Input disabled={isLoading} />
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
              <Input disabled={isLoading} />
            </Form.Item>
            <Form.Item
              label="Why do you want to join Digital Terrain?"
              name="joinReason"
              rules={[
                {
                  required: true,
                  message: 'Please provide why you would like to join Digital Terrain',
                },
              ]}
            >
              <Input.TextArea disabled={isLoading} />
            </Form.Item>
            <Form.Item
              label="What is your ideal play style on Digital Terrain?"
              name="playStyle"
              rules={[
                {
                  required: true,
                  message: 'Please provide your ideal play style on Digital Terrain',
                },
              ]}
            >
              <Input.TextArea disabled={isLoading} />
            </Form.Item>
            <Form.Item
              label="What do you like to do in your free time?"
              name="freeTime"
            >
              <Input.TextArea disabled={isLoading} />
            </Form.Item>
            <Form.Item
              label="How did you hear about Digital Terrain?"
              name="source"
            >
              <Input.Group>
                <Select
                  dropdownMatchSelectWidth={false}
                  placeholder="Select an option"
                  disabled={isLoading}
                  onChange={handleSourceOptionChange}
                >
                  <Select.Option value="Reddit">Reddit</Select.Option>
                  <Select.Option value="Discord">Discord</Select.Option>
                  <Select.Option value="Twitch/Youtube">Twitch/Youtube</Select.Option>
                  <Select.Option value="Friend">Friend</Select.Option>
                  <Select.Option value="Other">Other</Select.Option>
                </Select>
                <Input.TextArea
                  placeholder="If 'Friend' or 'Other' please provide specifics here"
                  disabled={isLoading}
                  onChange={handleSourceTextChange}
                />
              </Input.Group>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="apply-page-submit-button"
                disabled={successfulSubmission}
                loading={isLoading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          {buildSubmitAlert()}
        </div>
      </Space>
    </div>
  );
};

ApplyView.propTypes = propTypes;

export default ApplyView;
