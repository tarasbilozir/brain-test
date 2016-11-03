const d = 100;

import React from 'react';

import brain from 'brain';

// import img from '/public/0.js';


export default class App extends React.Component {

  paint(event) {
    event.persist();
    // const canvas = document.getElementById('canvas');
     ctx = this.refs.canvas.getContext('2d');

    global.e = event;



    var x = event.nativeEvent.offsetX;
    var y = event.nativeEvent.offsetY;
    console.log(event,x,y)

     pixel = ctx.getImageData(x, y, 1, 1);
     data = pixel.data;
    var rgba = 'rgba(' + data[0] + ',' + data[1] +
               ',' + data[2] + ',' + (data[3] / 255) + ')';
    // color.style.background =  rgba;
    // color.textContent = rgba;

    console.log(rgba);

    ctx.beginPath();
    ctx.arc(x,y,1,0,2*Math.PI);
    ctx.stroke();

  }



  readToArray() {
    // const canvas = document.getElementById('canvas');
    const ctx = this.refs.canvas.getContext('2d');



    // ctx.drawImage($('img')[0], 0,0)
    ctx.getImageData(0,0,d,d)




    const pixels = ctx.getImageData(0,0,d,d).data;
    const w = ctx.getImageData(0,0,d,d).width;
    const h = ctx.getImageData(0,0,d,d).height;

    const arr = [];
    for (let i = 0; i < w * h; i++) {
      const g = pixels[i * 4 + 1];
      const r = pixels[i * 4];
      const b = pixels[i * 4 + 2];
      const a = pixels[i * 4 + 3];

      const x = (g + r + b) / 3 / 255;

      arr.push({ r, g, b, a, x});
    }
    // console.log(arr);
    console.log(arr.map(e => e.a/255 > 0.5 && 1 || 0))
    return arr;

  }

  render() {

    return (<div>
      <img src="Untitled.bmp" onClick={this.readToArray.bind(this)} />
      <h1>Hello!</h1>
      <canvas id="canvas" ref="canvas" width={d} height={d} style={{"border": "1px solid black"}} onMouseDown={this.paint.bind(this)}></canvas>
    </div>);
  }
}
