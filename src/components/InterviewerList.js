import React from "react";
import 'components/InterviewerList.scss'
import InterviewerListItem from 'components/InterviewerListItem'

export default function InterviewerList(props) {
  
  const interviewerList = props.interviewers.map((interviewer, index) => {
    return <InterviewerListItem 
      interviewer={interviewer.id} 
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer} 
      setInterviewer={props.setInterviewer} />
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
}