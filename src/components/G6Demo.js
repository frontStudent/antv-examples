import React, { useEffect } from "react";
import G6, { Graph } from "@antv/g6";

const data = {
  nodes: [
    {
      type: "circle",
      label: "开始",
      x: 87,
      y: 67,
      id: "start-5697805b-4b33-4805-b84d-f098a4adc322",
      name: "start",
      size: [74, 74],
      style: {
        fill: "#f8ffee",
        stroke: "#c2e899",
      },
      stateStyles: {
        hover: {
          fill: "#eeffd6",
        },
        selected: {
          fill: "#eeffd6",
          stroke: "#76c836",
          lineWidth: "1",
          shadowColor: "#76c836",
        },
        click: {
          fill: "#eeffd6",
          stroke: "#76c836",
          lineWidth: "1",
          shadowColor: "#76c836",
        },
      },
      labelCfg: {
        style: { fill: "#000000A6", fontSize: 18 },
      },
    },
    {
      type: "circle",
      label: "结束",
      x: 311,
      y: 67,
      id: "end-42fb7c91-4bab-406b-839a-5e55c19d644a",
      name: "end",
      size: [74, 74],
      style: {
        fill: "#fdf2f0",
        stroke: "#f8cec9",
      },
      stateStyles: {
        hover: {
          fill: "#fae0db",
        },
        selected: {
          fill: "#fae0db",
          stroke: "#ee8e83",
          lineWidth: "1",
          shadowColor: "#ee8e83",
        },
        click: {
          fill: "#fae0db",
          stroke: "#ee8e83",
          lineWidth: "1",
          shadowColor: "#ee8e83",
        },
      },
      labelCfg: {
        style: { fill: "#000000A6", fontSize: 18 },
      },
    },
  ],
  edges: [
    {
      source: "1",
      target: "2",
      data: { type: "name1", amount: "100,000,000,00 元", date: "2019-08-03" },
    },
    // 边数据 ...
  ],
};

export default () => {
  const containerRef = React.useRef(null);
  const graphRef = React.useRef();

  useEffect(() => {
    if (graphRef.current || !containerRef.current) return;

    const grid = new G6.Grid();
    G6.registerBehavior("activate-node", {
      getEvents() {
        return {
          "node:click": "onNodeClick",
          "canvas:click": "onCanvasClick",
          mousedown: "handleMouseDown",
          mousemove: "handleMouseMove",
          mouseup: "handleMouseUp",
        };
      },

      // 删除拖动中的线
      deleteDragingEdge() {
        var self = this;
        if (!self.edge) return;
        self.graph.removeItem(self.edge);
        self.edge = null;
      },

      // 所有node状态为click的节点都设为false
      clearAllNodeClick() {
        const self = this;
        // 设置节点状态
        const nodes = self.graph.findAllByState("node", "click");
        nodes.forEach((node) => {
          // self.graph.setItemState(node, "click", false);
          // self.graph.setItemState(node, "selected", false);
          node.clearStates(["click", "selected"]);
          console.log("清除节点状态", node);
          // 清除四个锚点
          self.graph.updateItem(node, {
            linkPoints: {
              top: false,
              right: false,
              bottom: false,
              left: false,
              size: 10,
              fill: "#fff",
            },
          });
        });
      },
      onCanvasClick(evt) {
        // 点击空白, 移除click状态
        let self = this;
        if (!evt.item) {
          // 清除所有的node和edge的click和selected状态
          self.clearAllNodeClick();
        }
      },
      onNodeClick(evt) {
        evt.preventDefault();
        const self = this;
        const item = evt.item;
        console.log("点击节点", item);
        if (!item) return;
        self.clearAllNodeClick();
        // 设置节点状态
        self.graph.setItemState(item, "click", true);
        self.graph.setItemState(item, "selected", true);
        // 点击节点再显示四个锚点
        self.graph.updateItem(item, {
          linkPoints: {
            top: true,
            right: true,
            bottom: true,
            left: true,
            size: 10,
            fill: "#fff",
          },
        });
      },

      handleMouseDown(evt) {
        // 鼠标按下, 增加self.edge对象用于移动
        evt.preventDefault();
        const self = this;
        const node = evt.item;
        if (!node || !evt.target.get("className").startsWith("link-point"))
          return;
        const graph = self.graph;
        const model = node.getModel();
        console.log("down:", model);

        if (self.edge) return;

        // 创建默认线条
        const edgeModel = {
          id: `edge-${Date.now()}`,
          name: "edge",
          source: model.id,
          target: model.id,
        };
        self.edge = graph.addItem("edge", edgeModel);
        console.log("down:", self.edge);
      },
      handleMouseMove(evt) {
        // 鼠标移动, 更新此edge的目标位置
        const self = this;
        const point = { x: evt.x, y: evt.y };
        if (self.edge) {
          self.graph.updateItem(self.edge, {
            target: point,
          });
        }
      },
      handleMouseUp(evt) {
        // 鼠标松开, 为edge增加目标node, 并重置self.edge, 允许再次拖动edge(拖动edge会走两次)
        const self = this;
        console.log("up:", self.edge);
        // 没有拖动的线则不工作
        if (!self.edge) return;
        const node = evt.item;
        const graph = self.graph;
        // 拖动edge会走两次, 因此增加判断
        if (node && !node.destroyed && node.getType() === "node") {
          const model = node.getModel();
          // 更新线条
          let label = `TO${model.label}`;
          graph.updateItem(self.edge, {
            target: model.id,
            label: label,
          });
          self.edge = null;
        } else {
          self.deleteDragingEdge();
        }
      },
    });

    const graph = new Graph({
      container: containerRef.current,
      width: 1200,
      height: 800,
      modes: {
        default: ["drag-canvas", "zoom-canvas", "drag-node", "activate-node"], // 允许拖拽画布、放缩画布、拖拽节点
      },
      layout: { type: "dagre", direction: "LR" },

      plugins: [grid],
    });

    // 绑定数据
    graph.data(data);
    // 渲染图
    graph.render();

    graphRef.current = graph;
  }, []);

  return <div ref={containerRef}></div>;
};
