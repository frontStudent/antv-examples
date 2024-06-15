import { useGraphStore, useExport } from "@antv/xflow";
import { Button, Space } from "antd";

export const Toolbar = () => {
  const nodes = useGraphStore((state) => state.nodes);
  const { exportPNG, exportJPEG, exportSVG } = useExport();

  return (
    <Space>
      <Button onClick={() => console.log(nodes, "nodes")}>get</Button>
      <Button onClick={() => console.log(nodes, "nodes")}>del</Button>
      <Button
        onClick={() =>
          exportPNG("xx", {
            width: 1000,
            height: 500,
            backgroundColor: "#ccc",
            padding: 30,
            preserveDimensions: true
          })
        }
      >
        exp
      </Button>
    </Space>
  );
};
