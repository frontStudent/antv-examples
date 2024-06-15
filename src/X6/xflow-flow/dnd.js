import { useDnd } from "@antv/xflow";

import "./index.css";
import React from "react";
import { Space } from "antd";
import { register } from "@antv/x6-react-shape";

const Dnd = () => {
  const { startDrag } = useDnd();
  const list = ["node1", "node2", "node3"];

  register({
    shape: "custom-node-with-port",
    width: 100,
    height: 100,
    inherit: "rect",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
    ports: {
      groups: {
        top: {
          position: "top",
          attrs: {
            circle: {
              magnet: true,
              r: 5,
            },
          },
        },
        bottom: {
          position: "bottom",
          attrs: {
            circle: {
              magnet: true,
              r: 5,
            },
          },
        },
      },
    },
  });

  const handleMouseDown = (e, item) => {
    startDrag(
      {
        // id: item,
        shape: "custom-node-with-port",
        width: 150,
        height: 32,
        attrs: {
          body: {
            stroke: "#D9DADD",
            strokeWidth: 1,
          },
        },
        label: item,
        ports: {
          items: [
            {
              id: "port_1",
              group: "top",
            },
            {
              id: "port_2",
              group: "bottom",
            },
          ],
        },
      },
      e
    );
  };

  return (
    <div className="xflow-hooks-use-dnd-dnd">
      <Space direction="vertical">
        {list.map((item) => (
          <div
            key={item}
            className="dnd-item"
            onMouseDown={(e) => handleMouseDown(e, item)}
          >
            {item}
          </div>
        ))}
      </Space>
    </div>
  );
};

export { Dnd };
