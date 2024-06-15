import { useGraphStore, useClipboard, useExport } from "@antv/xflow";
import { Button, Space } from "antd";

export const Toolbar = () => {
  const nodes = useGraphStore((state) => state.nodes);
  const removeNodes = useGraphStore((state) => state.removeNodes);
  const { exportPNG } = useExport();
  const { copy, paste } = useClipboard();

  const _getSelectedNodes = () => {
    const selected = nodes.filter((node) => node.selected);
    const ids = selected.map((node) => node.id || "");
    return ids;
  };

  const handleDeleteNodes = () => {
    removeNodes(_getSelectedNodes());
  };

  const handleCopy = () => {
    copy(_getSelectedNodes());
    paste({ offset: 20 });
  };

  const handleExport = () => {
    exportPNG("xx", {
      width: 1000,
      height: 500,
      backgroundColor: "#ccc",
      padding: 30,
      preserveDimensions: true,
    });
  }

  return (
    <Space>
      <Button onClick={() => console.log(nodes, "nodes")}>get</Button>
      <Button onClick={handleDeleteNodes}>del</Button>
      <Button onClick={handleCopy}>copy</Button>
      <Button onClick={handleExport}>exp</Button>
    </Space>
  );
};
