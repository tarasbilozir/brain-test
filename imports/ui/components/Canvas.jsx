import React from 'react';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.ratio = this.props.dim / this.props.netInputDim,
    console.log(this.ratio);
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

    ctx.fillRect(x - this.ratio / 2, y - this.ratio / 2, this.ratio, this.ratio);
    ctx.stroke();
    ctx.lineJoin = ctx.lineCap = 'round';


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

      ctx.lineWidth = this.ratio;
      ctx.lineJoin = ctx.lineCap = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
    }

  }

  clearCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    // ctx.closePath();
    ctx.clearRect(0, 0, this.props.dim, this.props.dim);
    ctx.beginPath(); // It necessary for correct clearing the canvas


    // const

    // console.log(ctx2.clearRect(0, 0, this.props.netInputDim, this.props.netInputDim));
  }

  getDataset() {
    const ctx = this.refs.canvas.getContext('2d');

    const ctx2 = this.refs.canvas2.getContext('2d');

    // E R R O R ! ! ! won't clear!
    this.refs.canvas2.width = this.refs.canvas2.width; // Only this line fixed the issue with canvas2 clearing
    // ctx2.beginPath(); // It necessary for correct clearing the canvas
    // ctx2.clearRect(0, 0, this.props.netInputDim, this.props.netInputDim);
    // ctx2.beginPath(); // It necessary for correct clearing the canvas


    ctx2.scale(1 / this.ratio, 1 / this.ratio);
    ctx2.drawImage(this.refs.canvas, 0, 0);
    ctx2.stroke();
    // ctx2.closePath();

    const canvasData = ctx2.getImageData(0,0,this.props.netInputDim,this.props.netInputDim);



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

      <canvas
        id="canvas2" ref="canvas2"
        width={this.props.netInputDim} height={this.props.netInputDim}
        style={{"border": "1px solid black"}}
      >
      </canvas>
    </div>);
  }

}
