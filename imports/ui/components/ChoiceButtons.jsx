import React from 'react';

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
