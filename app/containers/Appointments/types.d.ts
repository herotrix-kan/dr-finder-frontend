import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { ApplicationRootState } from "types";

/* --- STATE --- */
interface AppointmentsState {
  readonly newAppointment: Appointment;
  newAppointmentNotConfirmed: AppointmentNotConfirmed;
  readonly error: string | null;
  readonly loading: boolean;
}

export interface Appointment {
  readonly pId: string;
  readonly id: string | null;
  readonly doctorId: string;
  readonly patientId: string;
  readonly appointmentDateTime: string;
  readonly appointmentStatus: string;
  readonly timezone: string;
  readonly patientName: string;
  readonly doctorName: string;
  readonly location: string;
}
export interface AppointmentNotConfirmed {
  readonly doctorId: string;
  readonly patientId: string;
  readonly appointmentDateTime: string;
  readonly appointmentStatus: string;
  readonly timezone: string;
  readonly patientName: string;
  readonly doctorName: string;
  readonly location: string;
}

/* --- ACTIONS --- */
type AppointmentsActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type RootState = ApplicationRootState;
type ContainerState = AppointmentsState;
type ContainerActions = AppointmentsActions;

export { RootState, ContainerState, ContainerActions };
