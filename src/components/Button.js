import React from "react";

import "components/Button.scss";

export default function Button(props) {
   var classNames = require('classnames');
   let buttonClass = classNames('button', 
   { 'button--confirm': props.confirm }, 
   { 'button--danger': props.danger });
   return <button 
      onClick={props.onClick}
      disabled={props.disabled} 
      className={buttonClass}>{props.children}
   </button>;
 }
 
