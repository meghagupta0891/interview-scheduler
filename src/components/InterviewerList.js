import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
import PropTypes from 'prop-types';
export default function InterviewerList(props){
  const items = props.interviewers.map(data => {
      return ( data &&
        <InterviewerListItem 
          key={data.id}
          name={data.name} 
          avatar={data.avatar}
          selected={data.id === props.interviewer}
          setInterviewer={event => props.onChange(data.id)} 
        />
      );
    }
  );
  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{items}</ul>
    </section>
  )
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
  