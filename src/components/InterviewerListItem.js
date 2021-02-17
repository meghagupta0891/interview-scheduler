import React from "react";
import "components/InterviewerListItem.scss";
var classNames = require('classnames');
export default function InterviewerListItem(props) {   
    let interviewerListItemClass = classNames('interviewers__item',{
        'interviewer-list__item--selected': props.selected
    });
    return (
        <li className={interviewerListItemClass} onClick={props.setInterviewer}>
        <img
          className="interviewers__item-image"
          src={props.avatar}
          alt={props.name}
        />
        {props.name}
      </li>
      
    );
}
