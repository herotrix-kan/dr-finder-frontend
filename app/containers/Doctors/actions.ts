/*
 *
 * Doctors actions
 *
 */

import { action } from 'typesafe-actions';
import { Doctor } from './types';

import ActionTypes from './constants';

// export const defaultAction = () => action(ActionTypes.DEFAULT_ACTION);
export const listDoctorsAction = () => action(ActionTypes.LIST_DOCTORS);
export const listDoctorsSuccessAction = (doctors: [Doctor]) => action(ActionTypes.LIST_DOCTORS_SUCCESS, doctors);
export const listDoctorsFailedAction = (error: string) => action(ActionTypes.LIST_DOCTORS_FAILED, error);
