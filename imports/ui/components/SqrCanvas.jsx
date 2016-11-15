import React from 'react';

export default class SqrCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.lineWidth = this.props.lineWidth,

    this.state = {
      isDrawing: false,
    }
  }

  startPaint(event) {
    if (this.lineWidth) this.setState({ isDrawing: true });

    const ctx = this.refs.canvas.getContext('2d');

    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    ctx.moveTo(x,y);

    ctx.fillRect(x - this.lineWidth / 2, y - this.lineWidth / 2, this.lineWidth, this.lineWidth);
    ctx.stroke();


  }

  paint(event) {
    event.persist();
    if (this.state.isDrawing) {
      const ctx = this.refs.canvas.getContext('2d');

      const x = event.nativeEvent.offsetX;
      const y = event.nativeEvent.offsetY;

      ctx.lineWidth = this.lineWidth;
      ctx.lineJoin = ctx.lineCap = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
    }

  }

  clearCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    // ctx.closePath();
    ctx.clearRect(0, 0, this.props.dim, this.props.dim);

    this.refs.canvas.width = this.refs.canvas.width; // Only this line fixed the issue with canvas2 clearing

    ctx.beginPath(); // It necessary for correct clearing the canvas
  }

  getDataset() {
    const ctx = this.refs.canvas.getContext('2d');

    const canvasData = ctx.getImageData(0, 0, this.props.dim, this.props.dim);

    const pixels = canvasData.data;
    const w = canvasData.width;
    const h = canvasData.height;

    const arr = [];
    let sum = 0;
    for (let i = 0; i < w * h; i++) {
      const r = pixels[i * 4],
        g = pixels[i * 4 + 1],
        b = pixels[i * 4 + 2],
        a = pixels[i * 4 + 3];

      const grayscale = Math.round((g + r + b) / 3);

      arr.push({ r, g, b, a, grayscale });

      sum += r + g + b + a;
    }

    console.log('sum:', sum);
    return arr;
  }

  /**
   * Fit image 'img' with 'dim' dimension to current canvas
   */
  fit(img, dim) {
    const ctx = this.refs.canvas.getContext('2d');

    this.clearCanvas(); // Before drawing

    ctx.scale(this.props.dim / dim, this.props.dim / dim);
    ctx.drawImage(img.refs.canvas, 0, 0);
    ctx.stroke();
  }

  render() {
    return (<span>
      <canvas
        ref="canvas"
        width={this.props.dim} height={this.props.dim}
        onMouseDown={this.startPaint.bind(this)}
        onMouseMove={this.paint.bind(this)}
        onMouseUp={() => this.setState({ isDrawing: false })}
        style={{
          cursor: "pointer",
          zIndex: 100,
          border: "1px solid black",
        }}
      >
      </canvas>

    </span>);
  }

}
