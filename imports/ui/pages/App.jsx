import React from 'react';
import SqrCanvas from '/imports/ui/components/SqrCanvas.jsx';
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

    this.refs.canvas2.clearCanvas();


    // console.log('--->', this.refs.canvas.getDataset());

    this.refs.canvas2.fit(this.refs.canvas, this.props.dim);



    this.state.dataset.push({
      input: this.refs.canvas2.getDataset().map(item => item.a / 255),
      output: this.refs.radio.getChoice()
    });
    console.log(this.state.dataset);

    console.log(this.refs.canvas2.getDataset().map((item,i)=> item.a));

    // return arr;
    // this.clearCanvas();

    this.refs.canvas.clearCanvas();
    // this.refs.canvas2.clearCanvas();
  }

  train() {
    global.net = new brain.NeuralNetwork();

    console.log(net.train(this.state.dataset));
  }

  run() {
    global.res = net.run(this.refs.canvas2.getDataset().map(item => item.a / 255));
    console.log(res);

  }

  render() {
    return (<div className="container">
      <h1>Hello!</h1>

      <SqrCanvas ref="canvas" dim={this.props.dim} lineWidth={5} />
      <button onClick={this.clearCanvas.bind(this)}>Clear</button>

      <Radio ref="radio" choice={[':)', ':|', ':(']} />
      <button onClick={this.pushToDataset.bind(this)}>Add to set</button>
      <SqrCanvas ref="canvas2" dim={this.props.netInputDim} />
      <button onClick={this.train.bind(this)}>Train</button>
      <button onClick={this.run.bind(this)}>Run</button>
    </div>);
  }
}
