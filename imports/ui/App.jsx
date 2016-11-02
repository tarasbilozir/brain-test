import React from 'react';

import brain from 'brain';

// import img from '/public/0.js';


export default class App extends React.Component {

  paint(event) {


    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');





    var x = event.layerX;
    var y = event.layerY;
    console.log(event,x,y)

    // var pixel = ctx.getImageData(x, y, 1, 1);
    // var data = pixel.data;
    // var rgba = 'rgba(' + data[0] + ',' + data[1] +
    //            ',' + data[2] + ',' + (data[3] / 255) + ')';
    // color.style.background =  rgba;
    // color.textContent = rgba;


  }

  pick(event) {


    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');





    var x = event.layerX;
    var y = event.layerY;
    console.log(event,x,y)

    // var pixel = ctx.getImageData(x, y, 1, 1);
    // var data = pixel.data;
    // var rgba = 'rgba(' + data[0] + ',' + data[1] +
    //            ',' + data[2] + ',' + (data[3] / 255) + ')';
    // color.style.background =  rgba;
    // color.textContent = rgba;


  }

  readToArray() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');



    ctx.drawImage($('img')[0], 0,0)
    ctx.getImageData(0,0,10,10)




    const pixels = ctx.getImageData(0,0,10,10).data;
    const w = ctx.getImageData(0,0,10,10).width;
    const h = ctx.getImageData(0,0,10,10).height;

    const arr = [];
    for (let i = 0; i < w * h; i++) {
      const g = pixels[i * 4 + 1];
      const r = pixels[i * 4];
      const b = pixels[i * 4 + 2];
      const a = pixels[i * 4 + 3];

      const x = (g + r + b) / 3 / 255;

      arr.push({ r, g, b, a, x});
    }
    console.log(arr.map(e => e.x < 0.5 && 1 || 0))
    return arr;

  }

  render() {

    return (<div>
      <img src="Untitled.bmp" />
      <h1 onClick={this.readToArray}>Hello!</h1>
      <canvas id="canvas" width="10" height="10" style={{"border": "1px solid black"}} onMouseDown={this.paint} onMouseMove={this.pick}></canvas>
    </div>);
  }
}
