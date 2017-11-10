// adapted FROM: https://github.com/lavrton/react-konva/blob/master/src/react-konva-fiber.js

export default function updatePicture(node) {
  var drawingNode = node.getLayer() || node.getStage();
  drawingNode && drawingNode.batchDraw();
}
