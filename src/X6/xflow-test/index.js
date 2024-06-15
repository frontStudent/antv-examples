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
  console.log(111)
  return (
    <div className="xflow-guide">
      <XFlow>
        <XFlowGraph
          zoomable
          pannable
          minScale={0.5}
          restrict
          connectionOptions={{
            allowNode: false,
            allowBlank: false,
            validateConnection({
              sourceCell,
              targetCell,
              sourceMagnet,
              targetMagnet,
            }) {
              // 不能连接自身
              if (sourceCell === targetCell) {
                return false;
              }

              // 只能从 bottom 连接桩开始连接，连接到 top 连接桩
              // if (
              //   !sourceMagnet ||
              //   sourceMagnet.getAttribute("port-group") === "top"
              // ) {
              //   return false;
              // }
              // if (
              //   !targetMagnet ||
              //   targetMagnet.getAttribute("port-group") !== "top"
              // ) {
              //   return false;
              // }

              // 不能重复连线
              const edges = this.getEdges();
              const portId = targetMagnet.getAttribute("port");
              if (edges.find((edge) => edge.getTargetPortId() === portId)) {
                return false;
              }

              return true;
            },
          }}
          connectionEdgeOptions={{
            animated: true,
            draggable: true,
            selected: true
          }}
        />
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
