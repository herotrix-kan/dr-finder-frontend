/*
 *
 * User reducer
 *
 */

import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  isAuthenticating: true,
  isAuthenticated: false,
  isCodeSent: false,
  loginError: null,
  registerError: null,
  registerConfirmError: null,
  loginUser: {
    id: null,
    patientName: null,
    introduction: null,
    address: null,
    suburb: null,
    addressState: null,
    postcode: null,
    speakingLanguage: [],
    phone: null,
    email: null,
  },
};

function userReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticating: true,
        isAuthenticated: false,
        loginUser: action.payload,
      };
    case ActionTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        isCodeSent: true,
      };
    case ActionTypes.USER_CONFIRM_REGISTER_SUCCESS:
      return {
        ...state,
        isCodeSent: false,
      };
    default:
      return state;
  }
}

export default userReducer;
