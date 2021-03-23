import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData () {

  // set state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // set the current day
  const setDay = day => setState({ ...state, day });

  // HTTP request and updates the local state
  function bookInterview(id, interview) {
 
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview}).then(() => {
      setState ({...state, appointments, days: updatedSpotsArr(state.days, appointments)})
    });
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
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState ({...state, appointment, days: updatedSpotsArr(state.days, appointments)})
    });
  }

  const availableSpots = function (day, appointments) {
    let count = 0;
    for (const id of day.appointments) {
      const appointment = appointments[id];
      if(!appointment.interview) {
        count++
      }
    }
    return count;
  }

  const updatedSpotsArr = (days, appointments) => {
    const newArray = days.map((day) => ({
      ...day,
      spots: availableSpots(day, appointments)
    }))
    return newArray
  }

  useEffect(() => {
    Promise.all ([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])

  return { bookInterview, cancelInterview, state, setDay }
}