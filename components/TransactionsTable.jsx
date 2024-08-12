import React, { useState } from "react";
import { Select, Table } from "antd";

const TransactionsTable = ({ transactions }) => {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [typefilter, setTypefilter] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  var filterTrans = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typefilter)
  );

  return (
    <div style={{ width: "100%", padding: "0rem 2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div className="input-flex">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select
          className="select-input"
          onChange={(value) => setTypefilter(value)}
          value={typefilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: "1rem",
        }}
        className="font-trans"
      >
        <h2>My Transactions</h2>
      </div>

      <Table dataSource={filterTrans} columns={columns} />
    </div>
  );
};

export default TransactionsTable;
