import React from "react";
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Status from 'components/Appointment/Status';
import Form from 'components/Appointment/Form';
import Error from 'components/Appointment/Error';
import Confirm from 'components/Appointment/Confirm';
import useVisualMode from 'hooks/useVisualMode';


const SHOW = "SHOW";
const EMPTY = "EMPTY";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview).then(() => transition(SHOW)).catch(error => transition(ERROR_SAVE,true));
    
  }

  function destroy() {
    
    transition(DELETE, true)
    props.cancelInterview(props.id).then(() => transition(EMPTY)).catch(error => transition(ERROR_DELETE, true));

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
      {mode === CONFIRM && <Confirm  onConfirm={destroy} onCancel={() => back(SHOW)} />}
      {mode === ERROR_SAVE && <Error onClose={() => back(CREATE)} />}
      {mode === ERROR_DELETE && <Error onClose={() => back(SHOW)} />}
    </article>
  );
}



