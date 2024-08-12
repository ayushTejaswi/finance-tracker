import React from "react";
import { Empty, Typography } from "antd";
const NoTrans = () => {
  return (
    <div style={{ margin: "20px", padding: "20px" }}>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{ height: 60 }}
        description={<Typography.Text>No Transactions Here...</Typography.Text>}
      ></Empty>
    </div>
  );
};

export default NoTrans;
