import { all, take, call, put, select, takeLatest } from 'redux-saga/effects';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import ActionTypes from './constants';
import * as actions from './actions';
import request from 'utils/request';
import * as queries from 'graphql/queries';
// import * as mutations from 'graphql/mutations';

export function* listDoctors(action: ReturnType<typeof actions.listDoctorsAction>, ) {
  try {

    const apiReturn = yield API.graphql(graphqlOperation(queries.listDoctors));
    console.info("apiReturn:", apiReturn);
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

// Individual exports for testing
export default function* doctorsSaga() {
  yield takeLatest(ActionTypes.LIST_DOCTORS, listDoctors);
}
