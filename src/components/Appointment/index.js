import React from "react";
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from '../../hooks/useVisualMode';

export default function Appointment(props){
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING";
    const DELETING = "DELETING";
    const CONFIRM = "CONFIRM";
    const ERROR_SAVE = "ERROR_SAVE";
    const ERROR_DELETE = "ERROR_DELETE";
    const EDIT = "EDIT";
  
    const add = () => transition(CREATE);
    const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
    const cancel = () => back();
    function save(name, interviewer) {
        const interview = {
          student: name,
          interviewer
        };
        transition(SAVING);

       props.bookInterview(props.id, interview)
          .then(() => transition(SHOW))
          .catch(error => transition(ERROR_SAVE, true));
    }
    const deleteItem = () => transition(CONFIRM);
    const confirmDelete = () => {

        transition(DELETING, true);
    
        props.cancelInterview(props.id)
          .then(() => transition(EMPTY))
          .catch(error => transition(ERROR_DELETE, true));
    }
    const edit = () => transition(EDIT);
    return(
        <article data-testid="appointment" className="appointment">
            <Header time={props.time} />
            {mode === EMPTY && <Empty onAdd={add} />}
            {mode === SAVING && <Status message="Saving" />}
            {mode === DELETING && <Status message="Deleting" />}
            {mode === SHOW && (
            <Show
                student={props.interview.student}
                interviewer={props.interview.interviewer}
                onDelete={deleteItem}
                onEdit={edit}
            />
            )}
            
            {mode === CREATE && (
                <Form
                interviewers={props.interviewers}
                onCancel={cancel}
                onSave={save}
                />
            )}
            {mode === CONFIRM && (
                <Confirm
                message="Are you sure you would like to delete?" 
                onCancel={cancel}
                onConfirm={confirmDelete}
                />
            )}
            {mode === ERROR_DELETE && (
                <Error
                message="Could not cancel appointment"
                onClose={() => back(SHOW)}
                />
            )}

            {mode === ERROR_SAVE && (
                <Error
                    message="Could not book appointment"
                    onClose={() => back()}
                />
            )}
            {mode === EDIT && (
                <Form
                interviewers={props.interviewers}
                onCancel={cancel}
                onSave={save}
                editing={true}
                interviewer={props.interview.interviewer.id}
                name={props.interview.student}
                />
            )}
        </article>
    )
  }
  