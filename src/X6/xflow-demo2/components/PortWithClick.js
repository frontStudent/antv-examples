import { useGraphStore, useGraphEvent } from "@antv/xflow";

const PortWithClick = () => {
  const updateNode = useGraphStore((state) => state.updateNode);
  const nodes = useGraphStore((state) => state.nodes);

  const handleRemovePort = (id) => {
    updateNode(id, {
      ports: {
        groups: {
          top: {
            position: "top",
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: "#5F95FF",
                strokeWidth: 1,
                fill: "#fff",
                style: { visibility: "hidden" },
              },
            },
          },
          right: {
            position: "right",
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: "#5F95FF",
                strokeWidth: 1,
                fill: "#fff",
                style: { visibility: "hidden" },
              },
            },
          },
          bottom: {
            position: "bottom",
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: "#5F95FF",
                strokeWidth: 1,
                fill: "#fff",
                style: { visibility: "hidden" },
              },
            },
          },
          left: {
            position: "left",
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: "#5F95FF",
                strokeWidth: 1,
                fill: "#fff",
                style: { visibility: "hidden" },
              },
            },
          },
        },
        items: [
          {
            id: "port-top",
            group: "top",
          },
          { id: "port-right", group: "right" },
          {
            id: "port-bottom",
            group: "bottom",
          },
          {
            id: "port-left",
            group: "left",
          },
        ],
      },
    });
  };

  const handleAddPort = (id) => {
    updateNode(id, {
      ports: {
        groups: {
          top: {
            position: "top",
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: "#5F95FF",
                strokeWidth: 1,
                fill: "#fff",
                style: { visibility: "visible" },
              },
            },
          },
          right: {
            position: "right",
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: "#5F95FF",
                strokeWidth: 1,
                fill: "#fff",
                style: { visibility: "visible" },
              },
            },
          },
          bottom: {
            position: "bottom",
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: "#5F95FF",
                strokeWidth: 1,
                fill: "#fff",
                style: { visibility: "visible" },
              },
            },
          },
          left: {
            position: "left",
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: "#5F95FF",
                strokeWidth: 1,
                fill: "#fff",
                style: { visibility: "visible" },
              },
            },
          },
        },
        items: [
          {
            id: "port-top",
            group: "top",
          },
          { id: "port-right", group: "right" },
          {
            id: "port-bottom",
            group: "bottom",
          },
          {
            id: "port-left",
            group: "left",
          },
        ],
      },
    });
  };

  useGraphEvent("node:mouseenter", (params) => {
    nodes.forEach((node) => {
      handleAddPort(node.id);
    });
  });

  useGraphEvent("node:mouseleave", (params) => {
    nodes.forEach((node) => {
      handleRemovePort(node.id);
    });
  });

  // useGraphEvent("blank:click", (params) => {
  //   nodes.forEach((node) => {
  //     handleRemovePort(node.id);
  //   });
  // });
};
export default PortWithClick;
