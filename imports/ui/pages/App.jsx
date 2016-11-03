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

  pushToDataset(event) {
    event.preventDefault();

    const arr = this.refs.canvas.getDataset();

    this.state.dataset.push({
      input: arr.map(item => item.a / 255),
      output: this.refs.radio.state.mood
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

    return (<div>
      <div>
        <h1>Hello!</h1>

        <Canvas ref="canvas" dim={this.props.dim} />
        <button onClick={this.clearCanvas.bind(this)}>Clear</button>


        <form onSubmit={this.pushToDataset.bind(this)}>
          <Radio ref="radio" mood={[':)', ':|', ':(', ':D']} />
          <button>Add to set</button>
        </form>

        <button onClick={this.train.bind(this)}>Train</button>
        <button onClick={this.run.bind(this)}>Run</button>
      </div>
    </div>);
  }
}
