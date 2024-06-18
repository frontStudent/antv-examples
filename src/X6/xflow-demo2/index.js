import {
  XFlow,
  XFlowGraph,
  Background,
  Clipboard,
  Snapline,
} from "@antv/xflow";
import React from "react";
// import { Dnd } from "./components/dnd";
import { Stencil } from "./components/Stencil";
import { Toolbar } from "./components/Toolbar";
import PortWithClick from "./components/PortWithClick";
import Setting from "./components/Setting";
import "./index.css";

const Page = () => {
  return (
    <div className="xflow-page">
      <XFlow>
        <Toolbar />
        <div className="xflow-hooks-use-dnd-Container">
          <Stencil />
          <div style={{ width: "70%", height: "100%"}}>
            <XFlowGraph
              zoomable
              // selectOptions={{
              //   showNodeSelectionBox: true,
              //   showEdgeSelectionBox: true,
              //   rubberband: true, // 是否开启框选
              // }}
              pannable
              panOptions={{
                eventTypes: ["leftMouseDown"],
                modifiers: ["ctrl"], // 配合ctrl键来拖拽画布，避免与框选操作冲突
              }}
              connectionOptions={{
                allowBlank: false,
              }}
            />
          </div>

          <Setting />
        </div>

        <Background color="#F2F7FA" />
        <Clipboard />
        <PortWithClick />
        <Snapline />
      </XFlow>
    </div>
  );
};

export default Page;
