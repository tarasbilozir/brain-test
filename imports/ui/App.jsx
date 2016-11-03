import React from 'react';
import Canvas from '/imports/ui/components/Canvas.jsx';
import brain from 'brain';

// import img from '/public/0.js';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // isDrawing: false,
      mood: [0, 0, 0],
      dataset: [],
    }
  }



  setMood(event) {
    event.persist();
    global.e = event;

    this.setState({
      mood: [
        event.target.name === 'smiles' && 1 || 0,
        event.target.name === 'indifferent' && 1 || 0,
        event.target.name === 'cry' && 1 || 0,
      ]
    });

    console.log(this.refs)
  }

  clearCanvas() {
    // this.refs.canvas.clearCanvas.bind(this);
    // console.log(this);
    this.refs.canvas.clearCanvas();
  }

  pushToDataset(event) {
    event.preventDefault();
    // const canvas = document.getElementById('canvas');


    const arr = this.refs.canvas.getDataset();



    this.state.dataset.push({
      input: arr.map(e => e.a/255 > 0.5 && 1 || 0),
      output: this.state.mood
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
    global.res = net.run(this.refs.canvas.getDataset().map(e => e.a/255 > 0.5 && 1 || 0));
    console.log(res);
  }

  render() {
    // console.log(React.Children.only(this.props.children));
    // global.R = React;
    // global.C = this.props;

    return (<div>
      <div>
        <h1>Hello!</h1>

        <div>
          <Canvas ref="canvas" dim={this.props.dim} />
        </div>
        <button onClick={this.clearCanvas.bind(this)}>Clear</button>


        <form onSubmit={this.pushToDataset.bind(this)}>
          <div onClick={this.setMood.bind(this)}>
            <input type="radio" name="smiles" ref="smiles" checked={this.state.mood[0]} />:)
            <input type="radio" name="indifferent" ref="indifferent" checked={this.state.mood[1]} />:|
            <input type="radio" name="cry" ref="cry" checked={this.state.mood[2]} />:(
          </div>
          <button>Add to set</button>
        </form>

        <button onClick={this.train.bind(this)}>Train</button>
        <button onClick={this.run.bind(this)}>Run</button>
      </div>
    </div>);
  }
}
