import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the user state domain
 */

const selectUsersDomain = (state: ApplicationRootState) => {
  return state.user ? state.user : initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by Doctors
 */

export const makeSelectUser = () =>
  createSelector(
    selectUsersDomain,
    substate => {
      return substate.loginUser;
    },
  );

export const makeSelectIsAuthenticating = () =>
  createSelector(
    selectUsersDomain,
    substate => {
      return substate.isAuthenticating;
    },
  );

export const makeSelectIsAuthenticated = () =>
  createSelector(
    selectUsersDomain,
    substate => {
      return substate.isAuthenticated;
    },
  );

export const makeSelectiIsCodeSent = () =>
  createSelector(
    selectUsersDomain,
    substate => {
      return substate.isCodeSent;
    },
  );

export const makeSelectLoginError = () =>
  createSelector(
    selectUsersDomain,
    substate => {
      return substate.loginError;
    },
  );


export const makeSelectRegisterError = () =>
  createSelector(
    selectUsersDomain,
    substate => {
      return substate.registerError;
    },
  );

export const makeSelectRegisterConfirmError = () =>
  createSelector(
    selectUsersDomain,
    substate => {
      return substate.registerConfirmError;
    },
  );