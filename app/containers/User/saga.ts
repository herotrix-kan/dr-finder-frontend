import { all, take, call, put, select, takeLatest } from 'redux-saga/effects';
import { Auth } from "aws-amplify";
import ActionTypes from './constants';
import * as actions from './actions';
import request from 'utils/request';


const apiKey = "api_key=6dca175d57c46d91b59decd5e3c7e4cf";
const url = `https://uq0jt4jgdl.execute-api.us-east-1.amazonaws.com/dev/graphql`;

export function* userLogin() {
  yield takeLatest(ActionTypes.USER_LOGIN, userLoginAmplify);
}

export function* userLoginAmplify(action) {
  try {
    const loginResponse = yield Auth.signIn(action.username, action.password);
    console.info("login response", loginResponse);

    if (!loginResponse) return;

    const url = `https://api.themoviedb.org/3/trending/all/day?${apiKey}`;
    const result = yield call(request, url);
    const patient = {
      id: result.sId,
      doctorName: result.doctorName,
      introduction: result.introduction,
      address: result.address,
      rsuburb: result.suburb,
      addressState: result.addressState,
      postcode: result.postcode,
      speakingLanguage: result.speakingLanguage,
      phone: result.phone,
      email: result.email,
    }
    yield put(actions.userLoginSuccessAction(patient));

  } catch (error) {
    yield put(actions.userLoginFailedAction(error.message));
  }
}

export function* userRegister() {
  yield takeLatest(ActionTypes.USER_CONFIRM_REGISTER, userRegisterAmplify);
}

export function* userRegisterAmplify(action) {
  try {
    yield Auth.signUp(action.username, action.password);
    yield put(actions.userRegisterSuccessAction(true));
  } catch (error) {
    yield put(actions.userRegisterFailedAction(error.message));
  }
}

export function* userConfirmRegister() {
  yield takeLatest(ActionTypes.USER_CONFIRM_REGISTER, userConfirmRegisterAmplify);
}

export function* userConfirmRegisterAmplify(action) {
  try {
    const result = yield Auth.confirmSignUp(action.username, action.confirmationCode);
    yield put(actions.userConfirmRegisterSuccessAction(action.username, result.id));

  } catch (error) {
    yield put(actions.userConfirmRegisterFailedAction(error.message));
  }
}

// Individual exports for testing
export default function* doctorsSaga() {
  // yield takeLatest(ActionTypes.LIST_MOVIES, listMovies);
  yield all([userLogin(), userRegister(), userConfirmRegister()]);
}
