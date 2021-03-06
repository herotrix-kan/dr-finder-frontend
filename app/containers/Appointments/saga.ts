import { all, take, call, put, select, takeLatest } from 'redux-saga/effects';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';

import ActionTypes from './constants';
import * as actions from './actions';
import * as userActions from './../User/actions';
// import {  } from './types';
import request from 'utils/request';
import * as mutations from 'graphql/mutations';
import * as queries from 'graphql/queries';
// import * as mutations from 'graphql/mutations';

export const getDoctorSelected = (state: any) => state.doctors.doctorSelected;
export const getLoginUser = (state: any) => state.user.loginUser;
export const getAppointments = (state: any) => state.appointments.appointments;
export const getNewAppointmentNotConfirmed = (state: any) => state.appointments.newAppointmentNotConfirmed;
export function* createAppointment(action: ReturnType<typeof actions.createAppointmentAction>, ) {
  try {
    const { date, time } = action.payload;

    const doctorSelected = yield select(getDoctorSelected);
    const loginUser = yield select(getLoginUser);

    const appointmentDateTime = JSON.stringify({ [date]: time }).replace(/"/g, "\\\"");
    const fullAddress = `${doctorSelected.address} ${doctorSelected.suburb},
    
    ${doctorSelected.addressState} ${doctorSelected.postcode}`;

    const newAppointmentNotConfirmed = {
      doctorId: doctorSelected.id,
      patientId: loginUser.id,
      appointmentDateTime,
      appointmentDate: date,
      appointmentTime: time,
      reason: "sick",
      timezone: doctorSelected.suburb,
      patientName: loginUser.patientName,
      doctorName: doctorSelected.doctorName,
      location: fullAddress,
      hospitalName: doctorSelected.hospitalName,
    }

    yield put(actions.createAppointmentSuccessAction(newAppointmentNotConfirmed));
  } catch (error) {
    yield put(actions.createAppointmentFailedAction(error.message));
  }
}

export function* confirmAppointment(action: ReturnType<typeof actions.confirmAppointmentAction>, ) {
  try {
    const appointmentNotConfirmed = yield select(getNewAppointmentNotConfirmed);
    delete appointmentNotConfirmed.appointmentDate;
    delete appointmentNotConfirmed.appointmentTime;
    const apiReturn = yield API.graphql(graphqlOperation(mutations.createAppointment, appointmentNotConfirmed));
    if (apiReturn.data.createAppointment) {
      yield put(actions.confirmAppointmentSuccessAction(apiReturn.data.createAppointment));
    }
    else {
      yield put(actions.confirmAppointmentFailedAction("Appointment booking failed"));
    }

  } catch (error) {
    yield put(actions.confirmAppointmentFailedAction(error.message));
  }
}

export function* listAppointments(action: ReturnType<typeof actions.listAppointmentsAction>, ) {
  try {

    const loginUser = yield select(getLoginUser);
    const id = loginUser.id;
    const apiReturn = yield API.graphql(graphqlOperation(queries.getPatient, { id }));
    const patient = apiReturn.data.getPatient;
    if (patient.appointments !== null) {
      yield put(userActions.userLoginSuccessAction(patient));
      yield put(actions.listAppointmentsSuccessAction(patient.appointments));
    }
    else {
      yield put(actions.listAppointmentsFailedAction("No Appointment"));
    }

  } catch (error) {
    yield put(actions.listAppointmentsFailedAction(error.message));
  }
}

export function* cancelAppointment(action: ReturnType<typeof actions.cancelAppointmentAction>, ) {
  try {
    const id = action.payload;
    const appointments = yield select(getAppointments);
    const apiReturn = yield API.graphql(graphqlOperation(mutations.updateAppointment, { id, appointmentStatus: "canceled" }));
    const isUpdated = apiReturn.data.updateAppointment;
    if (isUpdated) {
      const newAppointments = appointments.map(appointment => appointment.id == id ? { ...appointment, appointmentStatus: "canceled" } : appointment);
      yield put(actions.cancelAppointmentSuccessAction(newAppointments));
    }
    else {
      yield put(actions.cancelAppointmentFailedAction("Update failed"));
    }

  } catch (error) {
    yield put(actions.listAppointmentsFailedAction(error.message));
  }
}

// Individual exports for testing
export default function* doctorsSaga() {
  yield takeLatest(ActionTypes.CONFIRM_APPOINTMENT, confirmAppointment);
  yield takeLatest(ActionTypes.CREAT_APPOINTMENT, createAppointment);
  yield takeLatest(ActionTypes.LIST_APPOINTMENTS, listAppointments);
  yield takeLatest(ActionTypes.CANCEL_APPOINTMENT, cancelAppointment);
}
