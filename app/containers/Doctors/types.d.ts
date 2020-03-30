import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { ApplicationRootState } from "types";

/* --- STATE --- */
interface DoctorsState {
  readonly doctors: Doctor[];
  readonly error: boolean;
  readonly loading: boolean;
}
interface Doctor {
  readonly id: string;
  readonly video: boolean;
  readonly voteCount: number;
  readonly voteAverage: number;
  readonly title: string;
  readonly releaseDate: string;
  readonly genreIds: number[];
  readonly url: string;
  readonly backdropPath: string;
  readonly overview: string;
  readonly posterPath: string;
  readonly popularity: number;
  readonly mediaType: string;
}

/* --- ACTIONS --- */
type DoctorsActions = ActionType<typeof actions>;

/* --- EXPORTS --- */
type RootState = ApplicationRootState;
type ContainerState = DoctorsState;
type ContainerActions = DoctorsActions;

export { RootState, ContainerState, ContainerActions };
