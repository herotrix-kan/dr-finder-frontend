import { all, take, call, put, select, takeLatest } from 'redux-saga/effects';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import ActionTypes from './constants';
import * as actions from './actions';
import request from 'utils/request';
import { LoginUser } from './types';
import * as queries from 'graphql/queries';
import * as mutations from 'graphql/mutations';


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

    //will change to grahql call
    const id = loginResponse.CognitoUser.username;
    const apiReturn = await API.graphql(graphqlOperation(queries.GET_PATIENT, { id: 'some id' }));
    console.log(oneTodo);

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
export function* userReturnLogin(action: ReturnType<typeof actions.userReturnLoginAction>, ) {
  try {
    const id = action.payload;

    //change to graphql
    const url = `https://api.themoviedb.org/3/trending/all/day?${apiKey}`;

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
    if (response.user) yield put(actions.userRegisterSuccessAction(true));
  } catch (error) {
    alert(error.message);
    yield put(actions.userRegisterFailedAction(error.message));
  }
}

//will update confirmation, can create a patient in graphql
export function* userConfirmRegister(action: ReturnType<typeof actions.userConfirmRegisterAction>, ) {
  try {
    console.info(action.payload);
    const { username, confirmationCode } = action.payload;
    const response = yield Auth.confirmSignUp(username, confirmationCode);
    console.log(response);
    if (response.user) {

      const patient: LoginUser = {
        id: response.sId,
        patientName: response.patientName,
        introduction: response.introduction,
        address: response.address,
        suburb: response.suburb,
        addressState: response.addressState,
        postcode: response.postcode,
        speakingLanguage: response.speakingLanguage,
        phone: response.phone,
        email: response.email,
      }

      console.log(patient);
      //if save to db
      // yield put(actions.userConfirmRegisterSuccessAction(username, response.id));
    }
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
