import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { ApplicationRootState } from "types";

/* --- STATE --- */
interface DoctorsState {
  readonly doctors: Doctor[] | [];
  readonly doctorsSearched: Doctor[] | [];
  readonly doctorSelected: Doctor;
  readonly searchByName: string,
  readonly searchByPostcode: string,
  readonly error: string | null;
  readonly loading: boolean;
}
export interface Doctor {
  readonly pId: string;
  readonly id: string | null;
  readonly doctorName: string;
  readonly introduction: string;
  readonly address: string;
  readonly suburb: string;
  readonly addressState: string;
  readonly postcode: number | null;
  readonly speakingLanguage: string;
  readonly phone: string;
  readonly email: string;
  readonly hospitalName: string;
  readonly photoUrl: string;
  readonly availableHours: string;
  readonly bookedHours: string;
}

/* --- ACTIONS --- */
type DoctorsActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type RootState = ApplicationRootState;
type ContainerState = DoctorsState;
type ContainerActions = DoctorsActions;

export { RootState, ContainerState, ContainerActions };
