import { all, take, call, put, select, takeLatest } from 'redux-saga/effects';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import ActionTypes from './constants';
import * as actions from './actions';
import request from 'utils/request';
import { LoginUser } from './types';
import * as queries from 'graphql/queries';
import * as mutations from 'graphql/mutations';

export function* userLogin(action: ReturnType<typeof actions.userLoginAction>, ) {
  try {
    const { username, password } = action.payload;
    const loginResponse = yield Auth.signIn(username, password);

    if (!loginResponse.CognitoUser) return;

    //will change to grahql call
    const id = loginResponse.CognitoUser.username;
    const apiReturn = yield API.graphql(graphqlOperation(queries.getPatient, { id }));
    const patient = apiReturn.data.getPatient;
    yield put(actions.userLoginSuccessAction(patient));

  } catch (error) {
    alert(error.message);
    yield put(actions.userLoginFailedAction(error.message));
  }
}
export function* userReturnLogin(action: ReturnType<typeof actions.userReturnLoginAction>, ) {
  try {
    const id = action.payload;
    const apiReturn = yield API.graphql(graphqlOperation(queries.getPatient, { id }));
    const patient = apiReturn.data.getPatient;

    yield put(actions.userLoginSuccessAction(patient));
  } catch (error) {
    alert(error.message);
    yield put(actions.userLoginFailedAction(error.message));
  }
}
export function* userRegister(action: ReturnType<typeof actions.userRegisterAction>, ) {
  try {
    const { username, password } = action.payload;
    const response = yield Auth.signUp(username, password);
    if (response.user) yield put(actions.userRegisterSuccessAction(true));
  } catch (error) {
    alert(error.message);
    yield put(actions.userRegisterFailedAction(error.message));
  }
}

//will update confirmation, can create a patient in graphql
export function* userConfirmRegister(action: ReturnType<typeof actions.userConfirmRegisterAction>, ) {
  try {
    const { username, confirmationCode } = action.payload;
    const response = yield Auth.confirmSignUp(username, confirmationCode);
    const id = response.idToken.payload.sub;
    const apiReturn = yield API.graphql(graphqlOperation(mutations.createPatient, { id, username }));
    console.info("userConfirmRegister", apiReturn);
  } catch (error) {
    alert(error.message);
    yield put(actions.userConfirmRegisterFailedAction(error.message));
  }
}

// Individual exports for testing
export default function* doctorsSaga() {
  yield takeLatest(ActionTypes.USER_LOGIN, userLogin);
  yield takeLatest(ActionTypes.USER_RETURN_LOGIN, userReturnLogin);
  yield takeLatest(ActionTypes.USER_REGISTER, userRegister);
  yield takeLatest(ActionTypes.USER_CONFIRM_REGISTER, userConfirmRegister);
}
