import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';
import { List } from 'lodash';

/* --- STATE --- */
interface UserState {
  readonly isAuthenticating: boolean;
  readonly isAuthenticated: boolean;
  readonly loginUser: LoginUser;
  readonly loginError: string | null,
  readonly registerError: string | null,
  readonly registerConfirmError: string | null,
  readonly isCodeSent: boolean,
}
interface LoginUser {
  id: string | null;
  patientName: string | null;
  introduction: string | null,
  address: string | null,
  suburb: string | null,
  addressState: string | null,
  postcode: number | null,
  speakingLanguage: number[],
  phone: string | null,
  email: string | null,
}
/* --- ACTIONS --- */
type UserActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type RootState = ApplicationRootState;
type ContainerState = UserState;
type ContainerActions = UserActions;

export { RootState, ContainerState, ContainerActions };
