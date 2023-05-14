// adapted FROM: https://github.com/lavrton/react-konva/blob/master/src/react-konva-fiber.js
import Konva from 'konva';

export default function updatePicture(node: Konva.Node) {
  if (!Konva.autoDrawEnabled) {
    const drawingNode = node.getLayer() || node.getStage();
    drawingNode && drawingNode.batchDraw();
  }
}
