### xflow demo1
1. 拖拽添加节点
2. 通过连接桩创建边，并且初步设置一些连接校验逻辑
3. 对节点/边进行点击或框选后，能够复制和删除

### xflow demo2
1. 拖拽使用stencil，相比于dnd好处是可以用x6语法实现拖拽区节点绘制，无需用div+css重复实现样式
2. 鼠标移入节点显示连接桩，移出节点隐去连接桩
3. 增加右侧配置区域，获取当前点击节点信息

注：去除连接桩只能使用style: {visibility: 'hidden'} 如果直接将ports.item设为[]则对应的边也会消失