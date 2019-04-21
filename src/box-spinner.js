class BoxSpinner {
  constructor(option) {
    this.option = option;
    this.option.rotateV = this.option.rotateV || 0;
    this.option.rotateH = this.option.rotateH || 0;
    this.dim = this.mkdim(this.option);
    this.box = this._mkbox(this.dim);
    return {
      push: this.push.bind(this),
      rotate: this.rotate.bind(this)
    }
  }

  mkdim(opt) {
    const parts = [this._front, this._back, this._right, this._left, this._top, this._bottom];
    return parts.map(styler => {
      var style = styler(opt);
      return style.src.length > 0? this._createImg(style) : this._createDiv(style);
    });
  }

  _box = ({width, height}) => ({
    id: 'box',
    style: `transition: transform .5s;transform: rotate3D(0, 1, 0, 0deg) rotate3D(1, 0, 0, 0deg);transform-style: preserve-3d;transform-origin: center;width:${width};height:${height};`
  });
  _right = ({right, depth, height, width}) => ({
    id: 'right',
    src: `${right?`${right}` : ''}`,
    style: `transform: rotateY(90deg);transform-origin: left;background-color: efefef;color: beige;left: ${width};position: absolute;width:${depth};height:${height};`
    });
  _front = ({front, height, width}) => ({
    id: 'front',
    src: `${front?`${front}` : ''}`,
    style: `position: absolute;left: 0;width:${width};height:${height};`
  });
  _back = ({back, depth, height, width}) => ({
    id: 'back',
    src: `${back?`${back}` : ''}`,
    style: `transform: rotateY(180deg) translateZ(${depth});position: absolute;left: 0;width:${width};height:${height};`
    });
  _top = ({top, depth, width}) => ({
    id: 'top',
    src: `${top?`${top}` : ''}`,
    style: `transform:rotateX(-90deg);transform-origin: top;background-color: efefef;color: beige;left: 0px;position: absolute;width:${width};height:${depth};`
  });
  _bottom = ({depth, height, bottom, width}) => ({
    id: 'bottom',
    src: `${bottom?`${bottom}` : ''}`,
    style: `transform:rotateX(-90deg);transform-origin: top;background-color: efefef;color: beige;top: ${height};position: absolute;width:${width};height:${depth};`
  });
  _left = ({left, height, depth}) => ({
    id: 'left',
    src: `${left?`${left}` : ''}`,
    style: `transform: rotateY(90deg);transform-origin: left;background-color: efefef;color: beige;left: 0px;position: absolute;width:${depth};height:${height};`
  });

  _createImg(attr) {
    var div = document.createElement('img');
    for (const _ in attr) div.setAttribute(_, attr[_]);
    return div;
  }
  _createDiv(attr) {
    var div = document.createElement('div');
    for (const _ in attr) div.setAttribute(_, attr[_]);
    return div;
  }

  _mkbox(dim) {
    var div = this._createDiv(this._box(this.option));
    dim.forEach(a => div.append.call(div, a));
    return div;
  }

  push(dom) {
    dom.append(this.box);
    return this;
  }

  rotate(h, v) {
    this.option.rotateH = h != undefined ? h : this.option.rotateH;
    this.option.rotateV = v != undefined ? v : this.option.rotateV;
    this.box.style.transform = `rotate3d(0, 1, 0, ${this.option.rotateH}deg) rotate3d(1, 0, 0, ${this.option.rotateV}deg)`
    return this;
  }
}
export default BoxSpinner;