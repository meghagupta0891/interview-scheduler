import React,{ useState,useEffect }  from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from 'axios';

import "components/Application.scss";
import { getAppointmentsForDay,getInterviewersForDay,getInterview } from "helpers/selectors";

export default function Application(props) {
  const [state,setState] = useState({
    day: "Monday",
    days: [],
    appointments:{},
    dailyAppointments:[],
    interviewers:{}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState({...state,days});
  useEffect(()=>{
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev,
         days: all[0].data,
         dailyAppointments: all[1].data,
         interviewers:all[2].data
      }));      
    })
  },[]);
  

  // const interviewers = [
  //   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  //   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  //   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  //   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  //   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
  // ];
  const interviewers = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day).map(appointment => {
    console.log(JSON.stringify(appointment));
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={state.interviewers}
      />
    );
  });
  return (
    <main className="layout">
      <section className="sidebar">
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
      />

        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
