import { Spin } from "antd";
import React from "react";

const BufferingLoader = () => {
  return (
    <div className="Buffering-loader">
      <Spin size="large" />
    </div>
  );
};

export default BufferingLoader;
