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
    appointmentDateTime: "",
    appointmentStatus: "",
    reason: "",
    timezone: "Melbourne",
    patientName: "",
    doctorName: "",
    location: "",
    hospitalName: "",
  },
  newAppointmentNotConfirmed: {
    doctorId: "",
    patientId: "",
    appointmentDateTime: "",
    appointmentStatus: "",
    reason: "",
    timezone: "Melbourne",
    patientName: "",
    doctorName: "",
    location: "",
    hospitalName: "",
  },
  error: null,
  loading: false,
  newAppointmentRequested: false,
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
        newAppointmentNotConfirmed: action.payload,
        newAppointmentRequested: true,
      };

    case ActionTypes.CREAT_APPOINTMENT_FAILED:
      return {
        // Delete prefixed '@' from the github username
        ...state,
        loading: false,
        error: action.payload,
      };

    case ActionTypes.SET_NEW_APPOINTMENT_REQUESTED:
      return {
        // Delete prefixed '@' from the github username
        ...state,
        newAppointmentRequested: action.payload,
      };

    default:
      return state;
  }
}

export default appointmentsReducer;
