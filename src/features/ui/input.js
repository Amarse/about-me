import React from 'react';

const Input = (props) => {
  return (
    <>
      <label htmlFor={props.id}></label>
      <input type={props.type} name={props.name} placeholder={props.placeholder} value={props.value} onChange={props.onChange}/>
    </>
  );
};

export default Input;
