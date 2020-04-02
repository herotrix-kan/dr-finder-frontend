import { all, take, call, put, select, takeLatest } from 'redux-saga/effects';
import { Auth } from "aws-amplify";
import ActionTypes from './constants';
import * as actions from './actions';
import request from 'utils/request';
import { LoginUser } from './types';

const apiKey = "api_key=6dca175d57c46d91b59decd5e3c7e4cf";
const url = `https://uq0jt4jgdl.execute-api.us-east-1.amazonaws.com/dev/graphql`;

// export function* userLogin() {
//   yield takeLatest(ActionTypes.USER_LOGIN, userLoginAmplify);
// }
export function* userLogin(action: ReturnType<typeof actions.userLoginAction>, ) {
  try {
    const { username, password } = action.payload;
    console.info(username, password);
    const loginResponse = yield Auth.signIn(username, password);
    console.info("login response", loginResponse);

    if (!loginResponse.CognitoUser) return;

    const url = `https://api.themoviedb.org/3/trending/all/day?${apiKey}`;
    const id = loginResponse.CognitoUser.username;

    //will change to grahql call
    const result = yield call(request, url);
    const patient: LoginUser = {
      id: result.sId,
      patientName: result.patientName,
      introduction: result.introduction,
      address: result.address,
      suburb: result.suburb,
      addressState: result.addressState,
      postcode: result.postcode,
      speakingLanguage: result.speakingLanguage,
      phone: result.phone,
      email: result.email,
    }
    yield put(actions.userLoginSuccessAction(patient));

  } catch (error) {
    alert(error.message);
    yield put(actions.userLoginFailedAction(error.message));
  }
}
export function* userRegister(action: ReturnType<typeof actions.userRegisterAction>, ) {
  try {
    const { username, password } = action.payload;
    console.info(username, password);
    const response = yield Auth.signUp(username, password);
    console.info("register:", response);
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
    const result = yield Auth.confirmSignUp(username, confirmationCode);
    yield put(actions.userConfirmRegisterSuccessAction(username, result.id));

  } catch (error) {
    alert(error.message);
    yield put(actions.userConfirmRegisterFailedAction(error.message));
  }
}

// Individual exports for testing
export default function* doctorsSaga() {
  yield takeLatest(ActionTypes.USER_LOGIN, userLogin);
  yield takeLatest(ActionTypes.USER_REGISTER, userRegister);
  yield takeLatest(ActionTypes.USER_CONFIRM_REGISTER, userConfirmRegister);
}
