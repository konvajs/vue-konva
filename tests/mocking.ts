import Konva from 'konva';

type Pos = { x: number, y: number, button: number }

// @ts-ignore
Konva.Stage.prototype.simulateMouseDown = function(pos: Pos) {
  const top = this.content.getBoundingClientRect().top;

  this._pointerdown({
    clientX: pos.x,
    clientY: pos.y + top,
    button: pos.button || 0,
    type: 'mousedown',
  } as MouseEvent);
};

// @ts-ignore
Konva.Stage.prototype.simulateMouseMove = function(pos: Pos) {
  const top = this.content.getBoundingClientRect().top;

  const evt = {
    clientX: pos.x,
    clientY: pos.y + top,
    button: pos.button || 0,
    type: 'mousemove',
  } as MouseEvent;

  this._pointermove(evt);
  Konva.DD._drag(evt);
};

// @ts-ignore
Konva.Stage.prototype.simulateMouseUp = function(pos: Pos) {
  const top = this.content.getBoundingClientRect().top;

  const evt = {
    clientX: pos.x,
    clientY: pos.y + top,
    button: pos.button || 0,
    type: 'mouseup',
  };
  Konva.DD._endDragBefore(evt);
  this._pointerup(evt);
  Konva.DD._endDragAfter(evt);
};
