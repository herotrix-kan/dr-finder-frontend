/*
 *
 * Doctors actions
 *
 */

import { action } from 'typesafe-actions';
import { Appointment } from './types';

import ActionTypes from './constants';

// export const defaultAction = () => action(ActionTypes.DEFAULT_ACTION);
export const createAppointmentAction = (appointment: Appointment) => action(ActionTypes.CREAT_APPOINTMENT, appointment);
export const createAppointmentSuccessAction = (appointment: Appointment) => action(ActionTypes.CREAT_APPOINTMENT_SUCCESS, appointment);
export const createAppointmentFailedAction = (error: string) => action(ActionTypes.CREAT_APPOINTMENT_FAILED, error);