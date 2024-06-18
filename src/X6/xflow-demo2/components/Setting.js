import React, { useState, useEffect } from "react";
import { useGraphStore, useGraphEvent } from "@antv/xflow";
const Setting = () => {
  const nodes = useGraphStore((state) => state.nodes);

  return (
    <div style={{ width: 260, height: 200 }}>
      {JSON.stringify(nodes.filter((node) => node.selected))}
    </div>
  );
};
export default Setting;
