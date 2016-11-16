import React from 'react';

/*
export default class ChoiceButtons extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  //   // this.state = {
  //   //   choice: this.props.options.map(item => 0),
  //   // }
  //
  // }

  choose(event) {
    event.persist();

    console.log(event.nativeEvent.target.name);
    // this.setState({
    //   choice: this.props.options.map((item, i) => event.nativeEvent.target.name == i && 1 || 0),
    // });

    this.props.returnTo(this.props.options.map((item, i) => event.nativeEvent.target.name == i && 1 || 0));
  }

  // getChoice() {
  //   return this.state.choice;
  // }

  render() {
    return (<span onClick={this.choose.bind(this)}>
        {this.props.options.map((item, i) => (
          <button key={i} name={i}>{item}</button>
        ))}
    </span>);
  }

}
*/

export default ChoiceButtons = (props) => (<span>
  {props.options.map((item, i) => (
    <button
      key={i}
      onClick={
        () => props.returnTo(props.options.map((item, i2) => i2 == i && 1 || 0))
      }
    >
      {item}
    </button>
  ))}
</span>);
