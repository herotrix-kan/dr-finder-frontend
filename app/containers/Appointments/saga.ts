import { all, take, call, put, select, takeLatest } from 'redux-saga/effects';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';

import ActionTypes from './constants';
import * as actions from './actions';
// import {  } from './types';
import request from 'utils/request';
import * as queries from 'graphql/queries';
// import * as mutations from 'graphql/mutations';

export const getDoctorSelected = (state) => state.doctors.doctorSelected;
export const getLoginUser = (state) => state.user.loginUser;
export function* createAppointment(action: ReturnType<typeof actions.createAppointmentAction>, ) {

  try {
    const { date, time } = action.payload;
    const doctorSelected = yield select(getDoctorSelected);
    const loginUser = yield select(getLoginUser);
    const appointmentDateTime = { [date]: time }.toString();
    const fullAddress = `${doctorSelected.address} ${doctorSelected.suburb},
    
    ${doctorSelected.addressState} ${doctorSelected.postcode}`;

    const newAppointmentNotConfirmed = {
      doctorId: doctorSelected.id,
      patientId: loginUser.id,
      appointmentDateTime,
      appointmentStatus: "upcoming",
      timezone: doctorSelected.suburb,
      patientName: loginUser.patientName,
      doctorName: doctorSelected.doctorName,
      location: fullAddress,
    }
    yield put(actions.createAppointmentSuccessAction(newAppointmentNotConfirmed));
  } catch (error) {
    yield put(actions.createAppointmentFailedAction(error.message));
  }
}


// Individual exports for testing
export default function* doctorsSaga() {
  yield takeLatest(ActionTypes.CREAT_APPOINTMENT, createAppointment);
}
