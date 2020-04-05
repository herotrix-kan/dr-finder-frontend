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
  searchByName: "",
  searchByPostcode: "",
  error: true,
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
        ...initialState,
        loading: true,
        error: false,
        // loading: action.payload.doctors,
      };
    case ActionTypes.LIST_DOCTORS_SUCCESS:
      return {
        // Delete prefixed '@' from the github username
        loading: false,
        error: false,
        doctors: action.payload,
      };
    case ActionTypes.LIST_DOCTORS_FAILED:
      return {
        // Delete prefixed '@' from the github username
        ...initialState,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default moviesReducer;
