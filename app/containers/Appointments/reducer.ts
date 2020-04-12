/*
 *
 * Doctors reducer
 *
 */

import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  newAppointment: {
    pId: "appointment",
    id: null,
    doctorId: "",
    patientId: "",
    appointmentStartDateTime: "",
    appointmentFinishDateTime: "",
    appointmentStatus: "",
    timezone: "Melbourne",
    patientName: "",
    doctorName: "",
    location: "",
  },
  error: null,
  loading: false,
};

function appointmentsReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.CREAT_APPOINTMENT:
      return {
        // Delete prefixed '@' from the github username
        ...state,
        loading: true,
        error: null,
        // loading: action.payload.doctors,
      };
    case ActionTypes.CREAT_APPOINTMENT_SUCCESS:
      return {
        ...state,
        // Delete prefixed '@' from the github username
        loading: false,
        error: null,
        newAppointment: action.payload,
      };

    case ActionTypes.CREAT_APPOINTMENT_FAILED:
      return {
        // Delete prefixed '@' from the github username
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default appointmentsReducer;
