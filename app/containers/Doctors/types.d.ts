import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { ApplicationRootState } from "types";

/* --- STATE --- */
interface DoctorsState {
  readonly doctors: Doctor[] | [];
  readonly doctorsSearched: Doctor[] | [];
  readonly searchByName: string,
  readonly searchByPostcode: string,
  readonly error: boolean;
  readonly loading: boolean;
}
export interface Doctor {
  readonly sId: string;
  readonly id: string | null;
  readonly doctorName: string | null;
  readonly introduction: string | null;
  readonly address: string | null;
  readonly suburb: string | null;
  readonly postcode: number | null;
  readonly speakingLanguage: string | null;
  readonly phone: string | null;
  readonly email: string | null;
  readonly hospitalName: string | null;
  readonly photoUrl: number | null | null;
  readonly availableHours: string | null;
  readonly bookedHours: string | null;
}

/* --- ACTIONS --- */
type DoctorsActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type RootState = ApplicationRootState;
type ContainerState = DoctorsState;
type ContainerActions = DoctorsActions;

export { RootState, ContainerState, ContainerActions };
