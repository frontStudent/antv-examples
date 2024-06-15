import { XFlow, XFlowGraph, Background, Clipboard } from "@antv/xflow";
import React from "react";
import { Dnd } from "./dnd";
import { Toolbar } from "./Toolbar";
import "./index.css";

const Page = () => {
  return (
    <div className="xflow-page">
      <XFlow>
        <Toolbar />
        <div className="xflow-hooks-use-dnd-Container">
          <Dnd />
          <XFlowGraph
            zoomable
            selectOptions={{
              showNodeSelectionBox: true,
              showEdgeSelectionBox: true,
              rubberband: true,
            }}
            pannable
            panOptions={{
              eventTypes: ["leftMouseDown"],
              modifiers: ["ctrl"],
            }}
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
          />
        </div>
        <Background color="#F2F7FA" />
        <Clipboard />
      </XFlow>
    </div>
  );
};

export default Page;
