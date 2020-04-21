/*
 *
 * Doctor
 *
 */

import React, { useEffect, memo } from 'react';
import { Helmet } from "react-helmet";
import { RouteComponentProps } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Redirect, Route, Link } from 'react-router-dom'

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import { makeSelectDoctorSelected } from "containers/Doctors/selectors";
import { makeSelectUser } from "containers/User/selectors";
import { makeSelectNewAppointment, makeSelectNewAppointmentNotConfirmed, makeSelectLoading, makeSelectError, makeSelectNewAppointmentRequested, makeSelectNewAppointmentConfirmSuccess } from "./selectors";
import LoadingIndicator from 'components/LoadingIndicator';

import { createAppointmentAction, setNewAppointmentRequestedAction, confirmAppointmentAction } from './actions';
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import { Calendar } from "components/Booking";
const stateSelector = createStructuredSelector({
    doctorSelected: makeSelectDoctorSelected(),
    newAppointmentNotConfirmed: makeSelectNewAppointmentNotConfirmed(),
    loginUser: makeSelectUser(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
    newAppointmentRequested: makeSelectNewAppointmentRequested(),
    newAppointmentConfirmSuccess: makeSelectNewAppointmentConfirmSuccess(),
});

interface Props extends RouteComponentProps<any> { }

function ConfirmAppointment(props: Props) {
    // Warning: Add your key to RootState in types/index.d.ts file
    useInjectReducer({ key: "appointments", reducer: reducer });
    useInjectSaga({ key: "appointments", saga: saga });

    const { doctorSelected, newAppointmentNotConfirmed, newAppointmentConfirmSuccess, newAppointmentRequested, loginUser, loading, error } = useSelector(stateSelector);
    const dispatch = useDispatch();
    // if (loading) { return <LoadingIndicator />; }
    // if (error !== null) {
    //     return <div>{error}</div>
    // } why does it cause problem?
    if (newAppointmentConfirmSuccess) {
        return <Redirect to={{
            pathname: '/appointments',
            state: { from: props.location }
        }} />
    }
    if (newAppointmentNotConfirmed === null) {
        return <Redirect to={{
            pathname: '/doctors',
            state: { from: props.location }
        }} />
    }
    useEffect(() => {
        dispatch(setNewAppointmentRequestedAction(false));
    }, []);

    return (
        <div>
            <Helmet>
                <title>Confirm Appointment</title>
                <meta name="description" content="Description of Doctor" />
            </Helmet>
            <p>
                Your appointment is not booked yet
            </p>
            <div>
                <h3>Are these details correct?</h3>
                <div>
                    <h5>{newAppointmentNotConfirmed.appointmentDate}, {newAppointmentNotConfirmed.appointmentTime}</h5>
                    <p>{newAppointmentNotConfirmed.timezone} Line</p>
                </div>
                <div>
                    <h5>{newAppointmentNotConfirmed.doctorName}</h5>
                    <p>Reason: {newAppointmentNotConfirmed.reason}</p>
                    <p>30 mins Patient: {newAppointmentNotConfirmed.patientName}</p>
                </div>
                <div>
                    <h5>{newAppointmentNotConfirmed.hospitalName}</h5>
                    <p>{newAppointmentNotConfirmed.location}</p>
                </div>
            </div>
            <div>
                <div className="button" onClick={() => dispatch(confirmAppointmentAction())}>Yes, Book Now</div>
                <Link to="/make-appointment"> <button>No, Go Back </button></Link>
            </div>
        </div>
    );
}

export default memo(ConfirmAppointment);