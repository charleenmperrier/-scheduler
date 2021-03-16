import React from "react";
import 'components/DayListItem.scss'
import DayListItem from 'components/DayListItem'

export default function DayList(props) {
  
  const DayList = props.days.map((day, index) => {
    return <DayListItem 
      key={index} 
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day} 
      setDay={props.setDay} />
  })

  return (
    <ul>
    {DayList}
    </ul>
  );
}