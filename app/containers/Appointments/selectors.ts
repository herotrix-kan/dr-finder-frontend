import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the doctors state domain
 */

const selectAppointmentsDomain = (state: ApplicationRootState) => {
  return state.appointments ? state.appointments : initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by Doctors
 */

export const makeSelectNewAppointment = () =>
  createSelector(
    selectAppointmentsDomain,
    substate => {
      return substate.newAppointment;
    },
  );

export const makeSelectNewAppointmentNotConfirmed = () =>
  createSelector(
    selectAppointmentsDomain,
    substate => {
      return substate.newAppointmentNotConfirmed;
    },
  );

export const makeSelectLoading = () =>
  createSelector(
    selectAppointmentsDomain,
    substate => {
      return substate.loading;
    },
  );

export const makeSelectError = () =>
  createSelector(
    selectAppointmentsDomain,
    substate => {
      return substate.error;
    },
  );

export const makeSelectNewAppointmentRequested = () =>
  createSelector(
    selectAppointmentsDomain,
    substate => {
      return substate.newAppointmentRequested;
    },
  );

export const makeSelectNewAppointmentConfirmSuccess = () =>
  createSelector(
    selectAppointmentsDomain,
    substate => {
      return substate.newAppointmentConfirmSuccess;
    },
  );
