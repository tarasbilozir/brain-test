// const this.props.dim = 10;


import React from 'react';

import brain from 'brain';

// import img from '/public/0.js';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawing: false,
      dataset: [],
    }
  }

  startPaint(event) {
    this.setState({ isDrawing: true });



    const ctx = this.refs.canvas.getContext('2d');

    // global.e = event;

    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;





    ctx.moveTo(x,y);

    ctx.fillRect(x,y,1,1);
    ctx.stroke();
    ctx.lineJoin = ctx.lineCap = 'round';


    // ctx.beginPath();
    // ctx.arc(x,y,1,0,2*Math.PI);
    // ctx.stroke();
  }

  paint(event) {
    event.persist();
    // const canvas = document.getElementById('canvas');

    if (this.state.isDrawing) {
      const ctx = this.refs.canvas.getContext('2d');

      // global.e = event;

      const x = event.nativeEvent.offsetX;
      const y = event.nativeEvent.offsetY;
      // console.log(event,x,y)

      const pixel = ctx.getImageData(x, y, 1, 1);
      const data = pixel.data;
      const rgba = 'rgba(' + data[0] + ',' + data[1] +
                 ',' + data[2] + ',' + (data[3] / 255) + ')';

      // console.log(rgba);


      ctx.lineTo(x, y);
      ctx.stroke();


    }

  }

  clearCanvas() {

    console.log(this.props.dim);
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.props.dim, this.props.dim);


    ctx.beginPath(); // It necessary for correct clearing the canvas
  }

  setMood(event) {
    event.persist();
    global.e = event;

    this.setState({
      smiles: event.target.name === 'smiles',
      indifferent: event.target.name === 'indifferent',
      cry: event.target.name === 'cry',
    });

    console.log(this.refs)
  }

  pushToDataset(event) {
    event.preventDefault();
    // const canvas = document.getElementById('canvas');
    const ctx = this.refs.canvas.getContext('2d');



    // ctx.drawImage($('img')[0], 0,0)
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
    // console.log(arr);
    // console.log(arr.map(e => e.a/255 > 0.5 && 1 || 0))

    this.state.dataset.push({ input: arr.map(e => e.a/255 > 0.5 && 1 || 0), output: [1, 0] });
    console.log(this.state.dataset);

    // return arr;
    this.clearCanvas();
  }

  train() {

  }


  render() {

    return (<div>
      <h1>Hello!</h1>

      <div>
        <canvas
          id="canvas" ref="canvas"
          width={this.props.dim} height={this.props.dim}
          style={{"border": "1px solid black"}}
          onMouseDown={this.startPaint.bind(this)}
          onMouseMove={this.paint.bind(this)}
          onMouseUp={() => this.setState({ isDrawing: false })}
        >
        </canvas>
      </div>

      <form onSubmit={this.pushToDataset.bind(this)}>
        <div onClick={this.setMood.bind(this)}>
          <input type="radio" name="smiles" ref="smiles" checked={this.state.smiles} />:)
          <input type="radio" name="indifferent" ref="indifferent" checked={this.state.indifferent} />:|
          <input type="radio" name="cry" ref="cry" checked={this.state.cry} />:(
        </div>
        <button>Add to set</button>
      </form>

      <button onClick={this.train.bind(this)}>Train</button>
      <button onClick={this.clearCanvas.bind(this)}>Clear</button>
    </div>);
  }
}
