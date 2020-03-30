/*
 *
 * Doctors actions
 *
 */

import { action } from 'typesafe-actions';
import { } from './types';

import ActionTypes from './constants';

// export const defaultAction = () => action(ActionTypes.DEFAULT_ACTION);
export const listDoctors = () => action(ActionTypes.LIST_DOCTORS);
export const listDoctorsSuccess = (doctors) => action(ActionTypes.LIST_DOCTORS_SUCCESS, doctors);
export const listDoctorsFailed = (error) => action(ActionTypes.LIST_DOCTORS_FAILED, error);
