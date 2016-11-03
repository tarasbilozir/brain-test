import React from 'react';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
    this.state = {
      mood: this.props.mood.map(item => 0),
    }
  }

  setMood(event) {
    event.persist();
    // global.e = event;

    console.log(event.target.name , this.props.mood.map((item, i) => event.target.name == i && 1 || 0));

    this.setState({
      mood: this.props.mood.map((item, i) => event.target.name == i && 1 || 0),
    });

  }


  render() {
    return (<div>
      <div onClick={this.setMood.bind(this)}>
        {this.props.mood.map((item, i) => (<span key={i}>
          <input type="radio" name={i} ref={i} checked={this.state.mood[i]} />
          {item}
        </span>))}
      </div>
    </div>);
  }

}
