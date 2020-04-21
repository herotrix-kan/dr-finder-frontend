import { all, take, call, put, select, takeLatest } from 'redux-saga/effects';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';

import ActionTypes from './constants';
import * as actions from './actions';
// import {  } from './types';
import request from 'utils/request';
import * as mutations from 'graphql/mutations';
// import * as mutations from 'graphql/mutations';

export const getDoctorSelected = (state: any) => state.doctors.doctorSelected;
export const getLoginUser = (state: any) => state.user.loginUser;
export const getNewAppointmentNotConfirmed = (state: any) => state.appointments.newAppointmentNotConfirmed;
export function* createAppointment(action: ReturnType<typeof actions.createAppointmentAction>, ) {
  try {
    const { date, time } = action.payload;

    const doctorSelected = yield select(getDoctorSelected);
    const loginUser = yield select(getLoginUser);
    const appointmentDateTime = JSON.stringify({ [date]: time }).replace(/"/g, "\\\"");
    console.info("appointmentDateTime", appointmentDateTime)
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

    console.info("I am here:");
    const appointmentNotConfirmed = yield select(getNewAppointmentNotConfirmed);
    console.info("appointmentNotConfirmed:", appointmentNotConfirmed);
    delete appointmentNotConfirmed.appointmentDate;
    delete appointmentNotConfirmed.appointmentTime;
    const apiReturn = yield API.graphql(graphqlOperation(mutations.createAppointment, appointmentNotConfirmed));
    // const apiReturn = yield API.graphql(graphqlOperation(mutations.createAppointment, {
    //   doctorId: "doctor_0",
    //   patientId: "patient_DB42",
    //   appointmentDateTime: "31313",
    //   reason: "sick",
    //   timezone: "melbourne",
    //   patientName: "Zhi",
    //   doctorName: "Kan",
    //   location: "doncaster",
    //   hospitalName: "Best one"
    // }));

    console.info("appointmentNotConfirmed2:", apiReturn);
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


// Individual exports for testing
export default function* doctorsSaga() {
  yield takeLatest(ActionTypes.CONFIRM_APPOINTMENT, confirmAppointment);
  yield takeLatest(ActionTypes.CREAT_APPOINTMENT, createAppointment);
}
