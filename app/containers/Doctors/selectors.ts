import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the doctors state domain
 */

const selectDoctorsDomain = (state: ApplicationRootState) => {
  return state.doctors ? state.doctors : initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by Doctors
 */

export const makeSelectDoctors = () =>
  createSelector(
    selectDoctorsDomain,
    substate => {
      return substate.doctors;
    },
  );

export const makeSelectDoctorsSearched = () =>
  createSelector(
    selectDoctorsDomain,
    substate => {
      return substate.doctorsSearched;
    },
  );

export const makeSelectLoading = () =>
  createSelector(
    selectDoctorsDomain,
    substate => {
      return substate.loading;
    },
  );

export const makeSelectError = () =>
  createSelector(
    selectDoctorsDomain,
    substate => {
      return substate.error;
    },
  );
