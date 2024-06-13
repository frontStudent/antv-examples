import {
  XFlow,
  XFlowGraph,
  Grid,
  Background,
  Snapline,
  Transform,
} from "@antv/xflow";
import React from "react";
import { InitNode } from "./InitNode";
import "./index.css";

const Page = () => {
  return (
    <div className="xflow-guide">
      <XFlow>
        <XFlowGraph zoomable pannable minScale={0.5} />
        <Grid type="dot" />
        <Background color="#F2F7FA" />
        <Snapline sharp />
        <InitNode />
        <Transform resizing rotating />
      </XFlow>
    </div>
  );
};

export default Page;
