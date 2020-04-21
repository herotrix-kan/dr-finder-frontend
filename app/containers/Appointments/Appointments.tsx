/*
 *
 * Appointments
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
import { makeSelectAppointments, makeSelectLoading, makeSelectError } from "./selectors";
import LoadingIndicator from 'components/LoadingIndicator';

import { listAppointmentsAction } from './actions';
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import { Calendar } from "components/Booking";
const stateSelector = createStructuredSelector({
    appointments: makeSelectAppointments(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
});

interface Props extends RouteComponentProps<any> { }

function Appointments(props: Props) {
    // Warning: Add your key to RootState in types/index.d.ts file
    useInjectReducer({ key: "appointments", reducer: reducer });
    useInjectSaga({ key: "appointments", saga: saga });

    const { appointments, loading, error } = useSelector(stateSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listAppointmentsAction());
    }, []);

    if (loading || appointments == null) { return <LoadingIndicator />; }
    if (error !== null) {
        return <div>{error}</div>
    }
    return (
        <div>
            <Helmet>
                <title>Appointments</title>
                <meta name="description" content="Description of Doctor" />
            </Helmet>
            <div>
                {appointments.map((appointment, index) => (
                    <div key={`key-${index}`}>Hello, {appointment.doctorName}</div>
                ))}
            </div>
        </div>
    );
}

export default memo(Appointments);