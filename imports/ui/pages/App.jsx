import React from 'react';
import Canvas from '/imports/ui/components/Canvas.jsx';
import Radio from '/imports/ui/components/Radio.jsx';

import brain from 'brain';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: [],
    }
  }

  clearCanvas() {
    this.refs.canvas.clearCanvas();
  }

  pushToDataset() {

    this.state.dataset.push({
      input: this.refs.canvas.getDataset().map(item => item.a / 255),
      output: this.refs.radio.getChoice()
    });
    console.log(this.state.dataset);

    // return arr;
    this.clearCanvas();
  }

  train() {
    global.net = new brain.NeuralNetwork();

    console.log(net.train(this.state.dataset));
  }

  run() {
    global.res = net.run(this.refs.canvas.getDataset().map(item => item.a / 255));
    console.log(res);
  }

  render() {
    return (<div className="container">
      <h1>Hello!</h1>

      <Canvas ref="canvas" dim={this.props.dim} className="container" />
      <button onClick={this.clearCanvas.bind(this)}>Clear</button>

      <Radio ref="radio" choice={[':)', ':|', ':(']} className="container" />
      <button onClick={this.pushToDataset.bind(this)}>Add to set</button>

      <button onClick={this.train.bind(this)}>Train</button>
      <button onClick={this.run.bind(this)}>Run</button>
    </div>);
  }
}
