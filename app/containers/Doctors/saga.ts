import { all, take, call, put, select, takeLatest } from 'redux-saga/effects';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';

import ActionTypes from './constants';
import * as actions from './actions';
import { Doctor } from './types';
import request from 'utils/request';
import * as queries from 'graphql/queries';
// import * as mutations from 'graphql/mutations';

export function* listDoctors(action: ReturnType<typeof actions.listDoctorsAction>, ) {
  try {

    const apiReturn = yield API.graphql(graphqlOperation(queries.listDoctors));
    const doctors = apiReturn.data.listDoctors;

    if (doctors)
      yield put(actions.listDoctorsSuccessAction(doctors));
    else {
      yield put(actions.listDoctorsFailedAction('no doctor found'));
    }

  } catch (error) {
    alert(error.message);
    yield put(actions.listDoctorsFailedAction(error.message));
  }
}
export const getDoctors = (state) => state.doctors;
//will move this to actions
export function* searchDoctors(action: ReturnType<typeof actions.searchDoctorsAction>, ) {
  try {

    const { doctorName, postcode } = action.payload;

    const doctorsState = yield select(getDoctors);
    const doctorsSearched: [Doctor] = doctorsState.doctors.filter((doctor: Doctor) => {

      if (doctorName !== '' && postcode !== '') {
        if (doctor.doctorName === null || doctor.postcode === null) return;
        if (doctor.doctorName.toLowerCase().includes(doctorName.toLowerCase()) && doctor.postcode === parseInt(postcode)) {
          return doctor;
        }
        return null
      }
      else if (doctorName === '' && postcode !== '') {
        if (doctor.postcode === null) return;
        if (doctor.postcode === parseInt(postcode)) {
          return doctor;
        }
        return null
      }
      else if (doctorName !== '' && postcode === '') {
        if (doctor.doctorName === null) return;
        if (doctor.doctorName.toLowerCase().includes(doctorName.toLowerCase())) {
          return doctor;
        }
        return null
      }
      return doctor;

    });

    if (doctorsSearched.length > 0)
      yield put(actions.searchDoctorsSuccessAction(doctorsSearched));
    else {
      yield put(actions.searchDoctorsFailedAction('no doctor found'));
    }

  } catch (error) {
    alert(error.message);
    yield put(actions.searchDoctorsFailedAction(error.message));
  }
}

export function* selectDoctor(action: ReturnType<typeof actions.selectDoctorAction>, ) {
  try {
    const id = action.payload;
    const apiReturn = yield API.graphql(graphqlOperation(queries.getDoctor, { id }));
    const doctorSelected = apiReturn.data.getDoctor;
    if (doctorSelected) {
      yield put(actions.selectDoctorSuccessAction(doctorSelected));
    }
    else {
      yield put(actions.selectDoctorFailedAction("Not find the doctor"));
    }

  } catch (error) {
    alert(error.message);
    yield put(actions.searchDoctorsFailedAction(error.message));
  }
}
// Individual exports for testing
export default function* doctorsSaga() {
  yield takeLatest(ActionTypes.LIST_DOCTORS, listDoctors);
  yield takeLatest(ActionTypes.SEARCH_DOCTORS, searchDoctors);
  yield takeLatest(ActionTypes.SELECT_DOCTOR, selectDoctor);

}
