import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
export default function InterviewerList(props){
    let propData = props;
    let items = props.days.map(data => (
      
        <InterviewerListItem 
            key ={data.id}
            name={data.name} 
            avatar={data.avatar}
            selected={data.id === props.value}
            setInterviewer={(event)=>props.onChange(data.id)} 
        />
    ));
    return(
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">{{items}}</ul>
      </section>
    )
  }
  