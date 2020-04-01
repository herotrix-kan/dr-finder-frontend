/*
 *
 * User actions
 *
 */

import { action } from 'typesafe-actions';
import { } from './types';

import ActionTypes from './constants';

export const userLoginAction = (username: string, password: string) => action(ActionTypes.USER_LOGIN, username, password);
export const userLoginSuccessAction = (patient: object) => action(ActionTypes.USER_LOGIN_SUCCESS, patient);
export const userLoginFailedAction = (error: string) => action(ActionTypes.USER_LOGIN_FAILED, error);

export const userRegisterAction = (username: string, password: string) => action(ActionTypes.USER_REGISTER, username, password);
export const userRegisterSuccessAction = (isCodeSent: boolean) => action(ActionTypes.USER_REGISTER_SUCCESS, isCodeSent);
export const userRegisterFailedAction = (error: string) => action(ActionTypes.USER_REGISTER_FAILED, error);

export const userConfirmRegisterAction = (username: string, password: string) => action(ActionTypes.USER_CONFIRM_REGISTER, username, password);
export const userConfirmRegisterSuccessAction = (username: string, id: string) => action(ActionTypes.USER_CONFIRM_REGISTER_SUCCESS, username);
export const userConfirmRegisterFailedAction = (error: string) => action(ActionTypes.USER_CONFIRM_REGISTER_FAILED, error);

