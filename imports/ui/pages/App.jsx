import { Meteor } from 'meteor/meteor';
import React from 'react';
import SqrCanvas from '/imports/ui/components/SqrCanvas.jsx';
import Radio from '/imports/ui/components/Radio.jsx';

import brain from 'brain';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: [],
      result: [],
      answer: -1,
    }
  }

  pushToDataset(choice = this.refs.radio.getChoice()) {

    this.refs.canvas2.fit(this.refs.canvas, this.props.dim);

    this.state.dataset.push({
      input: this.refs.canvas2.getDataset().map(item => item.a / 255),
      output: choice
    });
    console.log(this.state.dataset);

    this.refs.canvas.clearCanvas();
  }

  train() {
    global.net = new brain.NeuralNetwork();
    const train = net.train(this.state.dataset);

    alert(`\nDone!\nTrain error: ${train.error}\nIterations: ${train.iterations}\n`);
  }

  trainOnServer() {
    Meteor.call('train', this.state.dataset, (err, { netJSON, train }) => {
      global.net = new brain.NeuralNetwork();
      net.fromJSON(netJSON);

      alert(`\nDone!\nTrain error: ${train.error}\nIterations: ${train.iterations}\n`);
    });
  }

  run() {
    this.refs.canvas2.fit(this.refs.canvas, this.props.dim);

    const result = net.run(this.refs.canvas2.getDataset().map(item => item.a / 255));
    console.log(result);
    this.setState({
      result: result,
      answer: result.reduce((prev, curr, i) => curr > prev[0] ? [curr, i] : prev, [-1, -1])[1],
    });

    // global.res = result;
  }

  render() {
    return (<div className="container">
      <h1>Smile recognition</h1>
      <p>try to train net with correct answers</p>

      <div>
        <SqrCanvas ref="canvas" dim={this.props.dim} lineWidth={6} />
        <SqrCanvas ref="canvas2" dim={this.props.netInputDim} />
      </div>

      <div>
        {/*
          <Radio ref="radio" choice={[':)', ':|', ':(']} />&nbsp;
          <button onClick={this.pushToDataset.bind(this)}>Add to set</button>
        */}
        <button onClick={this.pushToDataset.bind(this, [1, 0, 0])}>:)</button>
        <button onClick={this.pushToDataset.bind(this, [0, 1, 0])}>:|</button>
        <button onClick={this.pushToDataset.bind(this, [0, 0, 1])}>:(</button>
      </div>

      <div>
        <button onClick={this.train.bind(this)}>Train</button>
        <button onClick={this.trainOnServer.bind(this)}>Train on Server</button>
      </div>

      <div>
        <button onClick={() => { this.refs.canvas.clearCanvas() }}>Clear</button>
        <button onClick={this.run.bind(this)}>Run</button>
      </div>

      <ul className="unstiled">
        {this.state.result.map((item, i) => (<li key={i}>
          <b className={i === this.state.answer ? "answer" : "smile"}>
            {[':)', ':|', ':('][i]}
          </b>
          &nbsp;
          {(item * 100).toFixed(1)}%
        </li>))}
      </ul>
    </div>);
  }
}
