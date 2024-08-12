import React from "react";
import { Button, Modal, Form, Input, DatePicker } from "antd";

const AddIncome = ({ isIncomeVis, handleIncomeCancel, onFinish }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={isIncomeVis}
      style={{ fontWeight: "600" }}
      onCancel={handleIncomeCancel}
      title="Add Income"
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "income");
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: "600" }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: "600" }}
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: "600" }}
          label="Date"
          name="date"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker className="custom-input" format="DD-MM-YYYY" />
        </Form.Item>
        <Button className="btn btn-blue" type="primary" htmlType="submit">
          Add Income
        </Button>
      </Form>
    </Modal>
  );
};

export default AddIncome;
