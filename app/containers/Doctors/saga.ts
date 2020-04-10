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
    // console.info("apiReturn:", apiReturn);
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
export function* searchDoctors(action: ReturnType<typeof actions.searchDoctorsAction>, ) {
  try {

    const array1 = [1, 4, 9, 16];
    const map1 = array1.map(x => x * 2);
    const { doctorName, postcode } = action.payload;

    const doctorsState = yield select(getDoctors);
    const doctorsSearched: [Doctor] = doctorsState.doctors.filter((doctor: Doctor) => {
      if (doctorName !== '' && postcode !== '') {
        if (doctor.doctorName === doctorName && doctor.postcode === parseInt(postcode)) {
          return doctor;
        }
        return null
      }
      else if (doctorName === '' && postcode !== '') {
        if (doctor.postcode === parseInt(postcode)) {
          return doctor;
        }
        return null
      }
      else if (doctorName !== '' && postcode === '') {
        if (doctor.doctorName === doctorName) {
          return doctor;
        }
        return null
      }
      return doctor;

    });
    console.info(doctorsState);
    console.info(doctorsSearched);
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
// Individual exports for testing
export default function* doctorsSaga() {
  yield takeLatest(ActionTypes.LIST_DOCTORS, listDoctors);
  yield takeLatest(ActionTypes.SEARCH_DOCTORS, searchDoctors);
}
