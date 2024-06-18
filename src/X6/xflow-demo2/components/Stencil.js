import { Stencil as _Stencil } from "@antv/x6-plugin-stencil";
import React, { useEffect, useRef, useState } from "react";

import { useGraphInstance } from "@antv/xflow";
import { register } from "@antv/x6-react-shape";

import { diamond } from "../constant/nodes";

const Stencil = () => {
  const graph = useGraphInstance();
  const stencilContainer = useRef(null);

  useEffect(() => {
    if (graph && stencilContainer && stencilContainer.current) {
      register(diamond);
      const stencil = new _Stencil({
        title: "流程图",
        target: graph,
        stencilGraphWidth: 300,
        stencilGraphHeight: 180,
        collapsable: false,
        groups: [
          {
            title: "基础流程图",
            name: "group1",
          },
        ],
        layoutOptions: {
          columns: 2,
          columnWidth: 100,
          rowHeight: 55,
        },
      });
      stencilContainer.current.appendChild(stencil.container);

      const rect1 = graph.createNode({
        shape: "custom-diamond",
        label: "菱形",
      });
      const rect2 = graph.createNode({
        shape: "rect",
        width: 80,
        height: 40,
      });

      stencil.load([rect1, rect2], "group1");
    }
  }, [graph, stencilContainer]);

  return <div ref={stencilContainer}></div>;
};

export { Stencil };
