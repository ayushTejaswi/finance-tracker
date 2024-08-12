import React from "react";
import { Button, Modal, Form, Input, DatePicker } from "antd";

const AddExpense = ({ isExpenseVis, handleExpenseCancel, onFinish }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={isExpenseVis}
      style={{ fontWeight: "600" }}
      onCancel={handleExpenseCancel}
      title="Add Expense"
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
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
        {/* 
        <Form.Item
          style={{ fontWeight: "600" }}
          label="Tag"
          name="tag"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select className="select-input">
            <Select.Option value="Household">Household</Select.Option>
            <Select.Option value="Investment">Investment</Select.Option>
          </Select>
        </Form.Item> 
        */}
        <Button className="btn btn-blue" type="primary" htmlType="submit">
          Add Expense
        </Button>
      </Form>
    </Modal>
  );
};

export default AddExpense;
