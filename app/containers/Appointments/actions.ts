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

export const confirmAppointmentAction = () => action(ActionTypes.CONFIRM_APPOINTMENT, {});
export const confirmAppointmentSuccessAction = (appointment: Appointment) => action(ActionTypes.CONFIRM_APPOINTMENT_SUCCESS, appointment);
export const confirmAppointmentFailedAction = (error: string) => action(ActionTypes.CONFIRM_APPOINTMENT_FAILED, error);

export const setNewAppointmentRequestedAction = (isReqiested: boolean) => action(ActionTypes.SET_NEW_APPOINTMENT_REQUESTED, isReqiested);

export const listAppointmentsAction = () => action(ActionTypes.LIST_APPOINTMENTS, {});
export const listAppointmentsSuccessAction = (appointments: [Appointment]) => action(ActionTypes.LIST_APPOINTMENTS_SUCCESS, appointments);
export const listAppointmentsFailedAction = (error: string) => action(ActionTypes.LIST_APPOINTMENTS_FAILED, error);

export const cancelAppointmentAction = (id: string) => action(ActionTypes.CANCEL_APPOINTMENT, id);
export const cancelAppointmentSuccessAction = (appointments: [Appointment]) => action(ActionTypes.CANCEL_APPOINTMENT_SUCCESS, appointments);
export const cancelAppointmentFailedAction = (error: string) => action(ActionTypes.CANCEL_APPOINTMENT_FAILED, error);
