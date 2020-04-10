/*
 *
 * Doctors actions
 *
 */

import { action } from 'typesafe-actions';
import { Doctor } from './types';

import ActionTypes from './constants';

// export const defaultAction = () => action(ActionTypes.DEFAULT_ACTION);
export const listDoctorsAction = () => action(ActionTypes.LIST_DOCTORS);
export const listDoctorsSuccessAction = (doctors: [Doctor]) => action(ActionTypes.LIST_DOCTORS_SUCCESS, doctors);
export const listDoctorsFailedAction = (error: string) => action(ActionTypes.LIST_DOCTORS_FAILED, error);

export const searchDoctorsAction = (doctorName: string, postcode: string) => action(ActionTypes.SEARCH_DOCTORS, { doctorName, postcode });
export const searchDoctorsSuccessAction = (doctorsSearched: [Doctor]) => action(ActionTypes.SEARCH_DOCTORS_SUCCESS, doctorsSearched);
export const searchDoctorsFailedAction = (error: string) => action(ActionTypes.SEARCH_DOCTORS_FAILED, error);

export const selectDoctorAction = (id: string) => {
    action(ActionTypes.SELECT_DOCTOR, { id });
    return (dispatch, getState) => {
        const { doctors } = getState().doctors;
        const doctorSelected = doctors.find(doctor => doctor.id === id);
        if (doctorSelected) {
            dispatch(selectDoctorSuccessAction(doctorSelected));
        }
        else {
            dispatch(selectDoctorFailedAction("Not find the doctor"));
        }
    }
}

export const selectDoctorSuccessAction = (doctorSelected: [Doctor]) => action(ActionTypes.SELECT_DOCTOR_SUCCESS, doctorSelected);
export const selectDoctorFailedAction = (error: string) => action(ActionTypes.SELECT_DOCTOR_FAILED, error);