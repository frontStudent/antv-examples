import { useGraphStore, useClipboard, useExport } from "@antv/xflow";
import { Button, Space } from "antd";

export const Toolbar = () => {
  const nodes = useGraphStore((state) => state.nodes);
  const edges = useGraphStore((state) => state.edges);
  const removeNodes = useGraphStore((state) => state.removeNodes);
  const removeEdges = useGraphStore((state) => state.removeEdges);

  const { exportPNG } = useExport();
  const { copy, paste } = useClipboard();

  const _getSelectedNodes = () => {
    const selected = nodes.filter((node) => node.selected);
    const ids = selected.map((node) => node.id || "");
    return ids;
  };

  const _getSelectedEdges = () => {
    const selected = edges.filter((edge) => edge.selected);
    const ids = selected.map((edge) => edge.id || "");
    return ids;
  };

  const _getGraphData = () => {
    console.log(nodes, edges, "nodes, edges");
  };

  const handleDeleteCells = () => {
    removeNodes(_getSelectedNodes());
    removeEdges(_getSelectedEdges());
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
  };

  return (
    <Space>
      <Button onClick={_getGraphData}>get</Button>
      <Button onClick={handleDeleteCells}>del</Button>
      <Button onClick={handleCopy}>copy</Button>
      <Button onClick={handleExport}>exp</Button>
    </Space>
  );
};
