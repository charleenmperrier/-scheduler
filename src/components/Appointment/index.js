import React from "react";
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Status from 'components/Appointment/Status';
import Form from 'components/Appointment/Form';
import useVisualMode from 'hooks/useVisualMode';


const SHOW = "SHOW";
const EMPTY = "EMPTY";
const CREATE = "CREATE";
const SAVING = "SAVING"


export default function Appointment(props) {

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview).then(() => transition(SHOW))
    
    
  }
  console.log('here: ', props.interview)
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  
  return (
    <article className='appointment'>
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back(EMPTY)} />}
      {mode === SHOW && <Show  student={props.interview.student} interviewer={props.interview.interviewer.name} />}
      {mode === SAVING && <Status message="Saving..." />}
    </article>
  );
}



