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
import { makeSelectNewAppointment, makeSelectNewAppointmentNotConfirmed, makeSelectLoading, makeSelectError } from "./selectors";
import LoadingIndicator from 'components/LoadingIndicator';

import { createAppointmentAction } from './actions';
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
});

interface Props extends RouteComponentProps<any> { }

function ConfirmAppointment(props: Props) {
    // Warning: Add your key to RootState in types/index.d.ts file
    useInjectReducer({ key: "appointments", reducer: reducer });
    useInjectSaga({ key: "appointments", saga: saga });

    const { doctorSelected, newAppointmentNotConfirmed, loginUser, loading, error } = useSelector(stateSelector);
    const dispatch = useDispatch();

    console.info(doctorSelected);
    if (loading) { return <LoadingIndicator />; }
    if (error !== null) {
        return <div>{error}</div>
    }
    else if (doctorSelected.id === null || newAppointmentNotConfirmed.doctorId === null) {
        return <Redirect to={{
            pathname: '/doctors',
            state: { from: props.location }
        }} />
    }
    console.info("newAppointmentNotConfirmed:", newAppointmentNotConfirmed);
    return (
        <div>
            <Helmet>
                <title>Confirm Appointment</title>
                <meta name="description" content="Description of Doctor" />
            </Helmet>
            <div>
                <h3>Are these details correct?</h3>
                <div>

                </div>
            </div>
        </div>
    );
}

export default memo(ConfirmAppointment);