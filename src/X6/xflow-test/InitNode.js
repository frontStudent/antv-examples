import { useGraphStore,  useGraphEvent } from "@antv/xflow";
import { useEffect, useCallback } from "react";
import { register } from "@antv/x6-react-shape";
// import imgsrc from "./hh.png";

// const NodeComponent = () => {
// return <img style={{ width: "100%", height: "100%" }} alt="" src={imgsrc} />;
//   return <div style={{ width: "100%", height: "100%" }}>Hello World</div>;
// };

export const InitNode = () => {
  const initData = useGraphStore((state) => state.initData);
  const updateNode = useGraphStore((state) => state.updateNode);
  const nodes = useGraphStore((state) => state.nodes);

  useGraphEvent("edge:connected", (params) => {
    console.log("edge:connected");
  });

  useGraphEvent("node:click", (params) => {
    console.log("node:click", params);
    // updateNode(params.node.id, {
    //   selected: true
    // });
  });

  register({
    shape: "custom-node-width-port",
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

  const setInitData = useCallback(() => {
    initData({
      nodes: [
        {
          id: "1",
          shape: "custom-node-width-port",
          x: 32,
          y: 32,
          width: 100,
          height: 40,
          label: "Hello",
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
        {
          id: "2",
          shape: "custom-node-width-port",
          x: 160,
          y: 180,
          width: 60,
          height: 60,
          label: "World",
          ports: {
            items: [
              {
                id: "port_3",
                group: "top",
              },
              {
                id: "port_4",
                group: "bottom",
              },
            ],
          },
        },
      ],
      edges: [],
    });
  }, [initData]);

  useEffect(() => {
    setInitData();
  }, [setInitData]);

  // useEffect(()=>{
  //   console.log(nodes,'nodes')
  // },[nodes])

  return null;
};
