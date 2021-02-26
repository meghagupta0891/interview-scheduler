import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  UPDATE_SPOTS
} from "../reducer/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
   const setDay = day => dispatch({ type: SET_DAY, value: day });

  useEffect(() => {
    let daysUrl = "http://localhost:8001/api/days";
    let appsUrl = "http://localhost:8001/api/appointments";
    let interviewersUrl = "http://localhost:8001/api/interviewers";
  
    const promiseDays = axios.get(daysUrl);
    const promiseApps = axios.get(appsUrl);
    const promiseInts = axios.get(interviewersUrl);

    Promise.all([promiseDays, promiseApps, promiseInts]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, value: all });
    })
  }, [])

  function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };       
      dispatch({ type: SET_INTERVIEW,  value: appointments });
      dispatch({ type: UPDATE_SPOTS });
      return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview });
  }

function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };

   const appointments = {
     ...state.appointments,
     [id]: appointment
   };
   dispatch({ type: SET_INTERVIEW,  value: appointments });
   dispatch({ type: UPDATE_SPOTS });
   return axios.delete(`http://localhost:8001/api/appointments/${id}`);  
}

  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  };

}