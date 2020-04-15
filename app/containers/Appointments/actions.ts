/*
 *
 * Doctors actions
 *
 */

import { action } from 'typesafe-actions';
import { Appointment, AppointmentNotConfirmed } from './types';

import ActionTypes from './constants';

// export const defaultAction = () => action(ActionTypes.DEFAULT_ACTION);
export const createAppointmentAction = (date: string, time: string) => action(ActionTypes.CREAT_APPOINTMENT, { date, time });
export const createAppointmentSuccessAction = (appointmentNotConfirmed: AppointmentNotConfirmed) => action(ActionTypes.CREAT_APPOINTMENT_SUCCESS, appointmentNotConfirmed);
export const createAppointmentFailedAction = (error: string) => action(ActionTypes.CREAT_APPOINTMENT_FAILED, error);

export const confirmAppointmentAction = (date: string, time: string) => action(ActionTypes.CONFIRM_APPOINTMENT, { date, time });
export const confirmAppointmentSuccessAction = (appointment: Appointment) => action(ActionTypes.CONFIRM_APPOINTMENT_SUCCESS, appointment);
export const confirmAppointmentFailedAction = (error: string) => action(ActionTypes.CONFIRM_APPOINTMENT_FAILED, error);