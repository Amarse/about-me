import React from 'react';

const Button = (props) => {
  return (
    <>
      <button type={props.type} name={props.name} value={props.value} onClick={props.onClick}>
        {props.value}
      </button>
    </>
  );
};

export default Button;
