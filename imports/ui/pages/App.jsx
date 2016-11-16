import { Meteor } from 'meteor/meteor';
import React from 'react';
import SqrCanvas from '/imports/ui/components/SqrCanvas.jsx';
import ChoiceButtons from '/imports/ui/components/ChoiceButtons.jsx';

import brain from 'brain';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: [],
      dataCount: 0,
      result: [],
      answer: -1,
    }
  }

  pushToDataset(choice) {
    console.log('App-->',choice);

    this.refs.canvas2.fit(this.refs.canvas, this.props.dim);

    this.state.dataset.push({
      input: this.refs.canvas2.getDataset().map(item => item.a / 255),
      output: choice
    });

    this.setState({ dataCount: this.state.dataset.length });
    console.log(this.state.dataset, this.state.dataCount);

    this.refs.canvas.clearCanvas();
  }

  train() {
    const timerStart = Date.now();

    global.net = new brain.NeuralNetwork();
    const train = net.train(this.state.dataset);
    this.trainAlert(train, timerStart);
    // alert(`\nDone!\nTrain error: ${train.error}\nIterations: ${train.iterations}\nDuration: ${Math.round((Date.now() - timerStart) / 1000)} s\n`);
  }

  trainOnServer() {
    const timerStart = Date.now();

    Meteor.call('train', this.state.dataset, (err, { netJSON, train }) => {
      global.net = new brain.NeuralNetwork();
      net.fromJSON(netJSON);

      // Object.keys(x).map(item => x[item]);
      this.trainAlert(train, timerStart);
      // alert(`\nDone!\nTrain error: ${train.error}\nIterations: ${train.iterations}\nDuration: ${Math.round((Date.now() - timerStart) / 1000)} s\n`);
    });
  }

  trainAlert(train, timerStart) {
    alert(`\nDone!\nTrain error: ${train.error}\nIterations: ${train.iterations}\nDuration: ${Math.round((Date.now() - timerStart) / 1000)} s\n`);
  }

  run() {
    this.refs.canvas2.fit(this.refs.canvas, this.props.dim);

    const result = net.run(this.refs.canvas2.getDataset().map(item => item.a / 255));
    this.setState({
      result: result,
      answer: result.reduce((prev, curr, i) => curr > prev[0] ? [curr, i] : prev, [-1, -1])[1],
    });

    // global.res = result;
  }

  render() {
    return (<div className="outer"><div className="container" >
      <h1>Smile recognition</h1>
      <p>try to train net with correct answers</p>

      <div className="flexbox-parent">
        <div>
          <div>
            <SqrCanvas ref="canvas" dim={this.props.dim} lineWidth={6} />
          </div>

          <div>
            <button onClick={() => { this.refs.canvas.clearCanvas() }}>Clear</button>
            <button onClick={this.run.bind(this)}>Run</button>
            <span className="hidden">
              <SqrCanvas ref="canvas2" dim={this.props.netInputDim} />
            </span>
          </div>

          <ul className="unstiled">
            {this.state.result.map((item, i) => (<li key={i}>
              <b className={i === this.state.answer ? "answer" : "smile"}>
                {[':)', ':|', ':('][i]}
              </b>
              &nbsp;
              {(item * 100).toFixed(0)}<small>%</small>
            </li>))}
          </ul>
        </div>

        <div>
          <div title="Manual recognize">
            <ChoiceButtons
              options={[':)', ':|', ':(']}
              returnTo={this.pushToDataset.bind(this)}
            />
            &nbsp;
            {this.state.dataCount || ''}
          </div>

          <div>
            <button onClick={this.train.bind(this)}>Train</button>
            <button onClick={this.trainOnServer.bind(this)}>Train on Server</button>
          </div>
        </div>
      </div>

    </div></div>);
  }
}
