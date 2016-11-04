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
    }
  }

  pushToDataset() {

    this.refs.canvas2.fit(this.refs.canvas, this.props.dim);

    this.state.dataset.push({
      input: this.refs.canvas2.getDataset().map(item => item.a / 255),
      output: this.refs.radio.getChoice()
    });
    console.log(this.state.dataset);

    // console.log(this.refs.canvas2.getDataset().map((item,i)=> item.a));

    this.refs.canvas.clearCanvas();
  }

  train() {
    global.net = new brain.NeuralNetwork();

    console.log(train = net.train(this.state.dataset));
    alert(`

      
      Done!

      Error: ${train.error}

      Iterations: ${train.iterations}



` );
  }

  run() {

    // this.refs.canvas2.clearCanvas();
    this.refs.canvas2.fit(this.refs.canvas, this.props.dim);


    global.res = net.run(this.refs.canvas2.getDataset().map(item => item.a / 255));
    console.log(res);
    this.setState({ result: res });
  }

  render() {
    return (<div className="container">
      <h1>Hello!</h1>

      <div>
        <SqrCanvas ref="canvas" dim={this.props.dim} lineWidth={7} />
      </div>
      <SqrCanvas ref="canvas2" dim={this.props.netInputDim} />

      <button onClick={() => { this.refs.canvas.clearCanvas() }}>Clear</button>

      <div>
        <Radio ref="radio" choice={[':)', ':|', ':(']} />
      </div>

      <button onClick={this.pushToDataset.bind(this)}>Add to set</button>
      <button onClick={this.train.bind(this)}>Train</button>
      <button onClick={this.run.bind(this)}>Run</button>
      <ul>
        {this.state.result.map((e, i) => <li key={i}><b>{[':)', ':|', ':('][i]}</b> {e}</li>)}
      </ul>
    </div>);
  }
}
