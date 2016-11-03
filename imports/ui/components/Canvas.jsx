import React from 'react';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawing: false,
    }
  }

  startPaint(event) {
    this.setState({ isDrawing: true });

    const ctx = this.refs.canvas.getContext('2d');

    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    ctx.moveTo(x,y);

    ctx.fillRect(x,y,1,1);
    ctx.stroke();
    ctx.lineJoin = ctx.lineCap = 'round';
  }

  paint(event) {
    event.persist();
    if (this.state.isDrawing) {
      const ctx = this.refs.canvas.getContext('2d');

      const x = event.nativeEvent.offsetX;
      const y = event.nativeEvent.offsetY;

      const pixel = ctx.getImageData(x, y, 1, 1);
      const data = pixel.data;
      const rgba = 'rgba(' + data[0] + ',' + data[1] +
                 ',' + data[2] + ',' + (data[3] / 255) + ')';

      ctx.lineTo(x, y);
      ctx.stroke();
    }

  }

  clearCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.props.dim, this.props.dim);

    ctx.beginPath(); // It necessary for correct clearing the canvas
  }

  getDataset() {
    const ctx = this.refs.canvas.getContext('2d');

    ctx.getImageData(0,0,this.props.dim,this.props.dim)

    const pixels = ctx.getImageData(0, 0, this.props.dim, this.props.dim).data;
    const w = ctx.getImageData(0, 0, this.props.dim, this.props.dim).width;
    const h = ctx.getImageData(0, 0, this.props.dim, this.props.dim).height;

    const arr = [];
    for (let i = 0; i < w * h; i++) {
      const r = pixels[i * 4],
        g = pixels[i * 4 + 1],
        b = pixels[i * 4 + 2],
        a = pixels[i * 4 + 3];

      const x = (g + r + b) / 3 / 255;

      arr.push({ r, g, b, a, x });
    }
    return arr;
  }

  render() {
    return (<div>
      <canvas
        id="canvas" ref="canvas"
        width={this.props.dim} height={this.props.dim}
        style={{"border": "1px solid black"}}
        onMouseDown={this.startPaint.bind(this)}
        onMouseMove={this.paint.bind(this)}
        onMouseUp={() => this.setState({ isDrawing: false })}
      >
      </canvas>
    </div>);
  }

}
