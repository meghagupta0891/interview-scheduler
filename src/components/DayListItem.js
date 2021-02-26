import React from "react";
import "components/DayListItem.scss";
var classNames = require('classnames');
export default function DayListItem(props) {
    const formatSpots = (spots) => {
        return `${spots ? spots : `no`} ${
          spots === 1 ? "spot" : "spots"
        } remaining`;
      };
    let listItemClass = classNames('day-list__item',{ 
       'day-list__item--selected': props.selected ,
       'day-list__item--full': props.spots && props.spots === 0 
    });
    return (
        <li data-testid="day" className={listItemClass} onClick={() => props.setDay(props.name)}>
            <h2 className="text--regular">{props.name}</h2> 
            <h3 className="text--light">{formatSpots(props.spots)}</h3>
        </li>
    );
}
