/*
 *
 * Doctors reducer
 *
 */

import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  doctors: [],
  doctorsSearched: [],
  doctorSelected: {
    sId: 'doctor',
    id: null,
    doctorName: null,
    introduction: null,
    address: null,
    suburb: null,
    postcode: null,
    speakingLanguage: null,
    phone: null,
    email: null,
    hospitalName: null,
    photoUrl: null,
    availableHours: null,
    bookedHours: null,
  },
  searchByName: "",
  searchByPostcode: "",
  error: null,
  loading: false,
};

function moviesReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.LIST_DOCTORS:
      return {
        // Delete prefixed '@' from the github username
        ...state,
        loading: true,
        error: null,
        // loading: action.payload.doctors,
      };
    case ActionTypes.LIST_DOCTORS_SUCCESS:
      return {
        ...state,
        // Delete prefixed '@' from the github username
        loading: false,
        error: null,
        doctors: action.payload,
        doctorsSearched: action.payload,
      };

    case ActionTypes.LIST_DOCTORS_FAILED:
      return {
        // Delete prefixed '@' from the github username
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionTypes.SEARCH_DOCTORS:
      return {
        // Delete prefixed '@' from the github username
        ...state,
        loading: true,
        error: null,
        // loading: action.payload.doctors,
      };
    case ActionTypes.SEARCH_DOCTORS_SUCCESS:
      return {
        // Delete prefixed '@' from the github username

        ...state,
        loading: false,
        error: null,
        doctorsSearched: action.payload,
      };
    case ActionTypes.SEARCH_DOCTORS_FAILED:
      return {
        // Delete prefixed '@' from the github username
        ...state,
        loading: false,
        error: action.payload,
      };

    case ActionTypes.SELECT_DOCTOR:
      return {
        // Delete prefixed '@' from the github username
        ...state,
        loading: true,
        error: null,
        // loading: action.payload.doctors,
      };
    case ActionTypes.SELECT_DOCTOR_SUCCESS:
      return {
        // Delete prefixed '@' from the github username

        ...state,
        loading: false,
        error: null,
        doctorSelected: action.payload,
      };
    case ActionTypes.SELECT_DOCTOR_FAILED:
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

export default moviesReducer;
