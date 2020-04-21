/*
 *
 * Doctors reducer
 *
 */

import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  newAppointment: null,
  newAppointmentNotConfirmed: null,
  error: null,
  loading: false,
  newAppointmentRequested: false,
  newAppointmentConfirmSuccess: false,
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
        newAppointmentConfirmSuccess: false,
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

    case ActionTypes.CONFIRM_APPOINTMENT:
      console.info("CONFIRM_APPOINTMENT");
      return {
        // Delete prefixed '@' from the github username
        ...state,
        loading: true,
        error: null,
        // loading: action.payload.doctors,
      };
    case ActionTypes.CONFIRM_APPOINTMENT_SUCCESS:
      console.info("CONFIRM_APPOINTMENT_SUCCESS");
      return {
        ...state,
        // Delete prefixed '@' from the github username
        loading: false,
        error: null,
        newAppointment: action.payload,
        newAppointmentNotConfirmed: null,
        newAppointmentRequested: false,
        newAppointmentConfirmSuccess: true,
      };

    case ActionTypes.CONFIRM_APPOINTMENT_FAILED:
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
