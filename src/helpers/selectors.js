



export default function getAppointmentsForDay(state, day) {
  
  
  // filter through the days array, get obj that matches day and take [0] of the days array
  const filteredAppointments = state.days.filter(user => (user.name === day) )[0];
  
  // edge cases, empty arr if no day matches / or no data inside day
  if (filteredAppointments === undefined || state.days.length === 0) {
    return [];
  }

  // pulling out the appointments array
  const dayAppoint = filteredAppointments.appointments

  // looping through to get the id (key) of the appointments obj (from the day.appointments array)
  const appointObj = dayAppoint.map((id) => state.appointments[id])

  return appointObj;

}