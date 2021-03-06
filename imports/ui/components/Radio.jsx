import React from 'react';

export default class Radio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      choice: this.props.choice.map(item => 0),
    }
  }

  choose(event) {
    event.persist();

    this.setState({
      choice: this.props.choice.map((item, i) => event.target.name == i && 1 || 0),
    });

  }

  getChoice() {
    return this.state.choice;
  }

  render() {
    return (<span>
      <span onClick={this.choose.bind(this)}>
        {this.props.choice.map((item, i) => (<span key={i}>
          <input type="radio" name={i} ref={i} checked={this.state.choice[i]} />
          {item}
        </span>))}
      </span>
    </span>);
  }

}
