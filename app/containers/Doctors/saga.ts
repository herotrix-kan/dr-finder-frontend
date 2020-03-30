import { all, take, call, put, select, takeLatest } from 'redux-saga/effects';
import doctors from './_mocks/Doctors';
import ActionTypes from './constants';
import * as actions from './actions';
import request from 'utils/request';

const apiKey = "api_key=6dca175d57c46d91b59decd5e3c7e4cf";
const url = `https://api.themoviedb.org/3/trending/all/day?${apiKey}`;

export function* listDoctors() {
  yield takeLatest(ActionTypes.LIST_DOCTORS, fetchDoctors);
}

export function* fetchDoctors(action) {

  try {
    const response = yield call(request, url);
    if (response.results.length > 0) {
      let doctors = [];
      doctors = response.results.map(result => {
        const doctor = {
          id: result.id,
          voteCount: result.vote_count,
          voteAverage: result.vote_average,
          title: result.title,
          releaseDate: result.release_date,
          genreIds: result.genre_ids,
          backdropPath: `https://image.tmdb.org/t/p/w500${result.backdrop_path}`,
          overview: result.overview,
          posterPath: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
          popularity: result.popularity,
          mediaType: result.media_type,
        }
        return doctor;
      })
      yield put(actions.listDoctorsSuccess(doctors));
    }

  } catch (error) {
    yield put(actions.listDoctorsFailed(error));
  }
}

// Individual exports for testing
export default function* doctorsSaga() {
  // yield takeLatest(ActionTypes.LIST_MOVIES, listMovies);
  yield all([listDoctors()]);
}
