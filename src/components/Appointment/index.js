import React from "react";
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const add = () => transition(CREATE);
const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
const cancel = () => back();
export default function Appointment(props){
    return(
        <article className="appointment">
            <Header time={props.time} />
            {mode === EMPTY && <Empty onAdd={add} />}
            {mode === SHOW && (
            <Show
                student={props.interview.student}
                interviewer={props.interview.interviewer}
            />
            )}
            
            {mode === CREATE && (
                <Form
                interviewers={props.interviewers}
                onCancel={cancel}
                onSave={save}
                />
            )}

        </article>
    )
  }
  