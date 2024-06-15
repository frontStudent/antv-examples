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
            selectOptions={{ showNodeSelectionBox: true, rubberband: true }}
            pannable
            panOptions={{
              eventTypes: ["leftMouseDown"],
              modifiers: ["ctrl"],
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
