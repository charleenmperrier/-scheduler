import React from "react";
import 'components/DayListItem.scss'
import classnames from 'classnames'

export default function DayListItem(props) {

  const formatSpots = (props) => 
  (props.spots ? `${props.spots} spot${props.spots > 1 ? `s` : ``} remaining` : `no spots remaining`)
  
  const dayClass = classnames("day-list__item", 
  {'day-list__item--selected': props.selected}, 
  {'day-list__item--full': props.spots === 0})
  return (
    <li data-testid='day' className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 >{props.name}</h2> 
      <h3 >{formatSpots(props)}</h3>
    </li>
  );
}