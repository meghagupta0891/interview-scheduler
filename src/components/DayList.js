import React from "react";
import DayListItem from "./DayListItem";
export default function DayList(props){
    let propData = props;
    let items = props.days.map(data => (
        <DayListItem 
            name={data.name} 
            spots={data.spots} 
            selected={data.name === propData.day}
            setDay={propData.setDay} 
        />
    ));
    return(
      <ul> {items} </ul>
    )
  }
  