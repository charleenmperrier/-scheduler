import React from "react";
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Status from 'components/Appointment/Status';
import Form from 'components/Appointment/Form';
import Confirm from 'components/Appointment/Confirm';
import useVisualMode from 'hooks/useVisualMode';


const SHOW = "SHOW";
const EMPTY = "EMPTY";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview).then(() => transition(SHOW))
    
  }

  function deleteButton() {
    
    transition(DELETE)
    props.cancelInterview(props.id).then(() => transition(EMPTY))

  }
  
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  
  return (
    <article className='appointment'>
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back(EMPTY)} />}
      {mode === EDIT && <Form onSave={save} 
          name={props.interview.student} 
          interviewer={props.interview.interviewer.id} 
          interviewers={props.interviewers} 
          onCancel={() => back(SHOW)} 
           />}
      {mode === SHOW && <Show 
          onEdit={() => transition(EDIT)} 
          onDelete={() => transition(CONFIRM)} 
          student={props.interview.student} 
          interviewer={props.interview.interviewer.name} />}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETE && <Status message="Deleting..." />}
      {mode === CONFIRM && <Confirm  onConfirm={deleteButton} onCancel={() => back(SHOW)} />}
    </article>
  );
}



