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
    this.setState({ isDrawing: true });

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

      /*
      const pixel = ctx.getImageData(x, y, 1, 1);
      const data = pixel.data;
      const rgba = 'rgba(' + data[0] + ',' + data[1] +
        ',' + data[2] + ',' + (data[3] / 255) + ')';
      */

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

    this.refs.canvas.width = this.refs.canvas.width;

    ctx.beginPath(); // It necessary for correct clearing the canvas


    // const

    // console.log(ctx2.clearRect(0, 0, this.props.netInputDim, this.props.netInputDim));
  }

  getDataset() {
    const ctx = this.refs.canvas.getContext('2d');

    // const ctx2 = this.refs.canvas2.getContext('2d');

    // this.refs.canvas2.width = this.refs.canvas2.width; // Only this line fixed the issue with canvas2 clearing


    // ctx2.scale(1 / this.lineWidth, 1 / this.lineWidth);
    // ctx2.drawImage(this.refs.canvas, 0, 0);
    // ctx2.stroke();

    // const canvasData = ctx2.getImageData(0,0,this.props.netInputDim,this.props.netInputDim);
    const canvasData = ctx.getImageData(0,0,this.props.dim, this.props.dim);



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

  fit(img, dim) {
    const ctx = this.refs.canvas.getContext('2d');

    this.clearCanvas(); // Before drawing

    // this.refs.canvas.width = this.refs.canvas.width; // Only this line fixed the issue with canvas2 clearing
    // OR: this.clearCanvas();

    // console.log(img.refs.canvas, this.props.dim , dim);

    ctx.scale(this.props.dim / dim, this.props.dim / dim);
    ctx.drawImage(img.refs.canvas, 0, 0);
    // ctx.drawImage(this.refs.canvas, 0, 0);
    ctx.stroke();
  }

  render() {
    return (<span>
      <canvas
        id="canvas" ref="canvas"
        width={this.props.dim} height={this.props.dim}
        style={{"border": "1px solid black"}}
        onMouseDown={this.startPaint.bind(this)}
        onMouseMove={this.paint.bind(this)}
        onMouseUp={() => this.setState({ isDrawing: false })}
      >
      </canvas>

    </span>);
  }

}
