// adapted FROM: https://github.com/lavrton/react-konva/blob/master/src/react-konva-fiber.js
import Konva from 'konva';

export default function updatePicture(node) {
  if (!Konva.autoDrawEnabled) {
    var drawingNode = node.getLayer() || node.getStage();
    drawingNode && drawingNode.batchDraw();
  }
}
