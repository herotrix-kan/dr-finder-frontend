import { ActionType } from 'typesafe-actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface UserState {
  readonly default: any;
}

/* --- ACTIONS --- */

/* --- EXPORTS --- */
type RootState = ApplicationRootState;
type ContainerState = UserState;

export { RootState, ContainerState };
