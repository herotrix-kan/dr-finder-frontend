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
import { makeSelectNewAppointment, makeSelectLoading, makeSelectError } from "./selectors";
import LoadingIndicator from 'components/LoadingIndicator';

import { createAppointmentAction } from './actions';
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import { Calendar } from "components/Booking";
const stateSelector = createStructuredSelector({
    doctorSelected: makeSelectDoctorSelected(),
    loginUser: makeSelectUser(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
});

interface Props extends RouteComponentProps<any> { }

function MakeAppointment(props: Props) {
    // Warning: Add your key to RootState in types/index.d.ts file
    useInjectReducer({ key: "appointments", reducer: reducer });
    useInjectSaga({ key: "appointments", saga: saga });

    // useEffect(() => {
    //     // When initial state username is not null, submit the form to load repos
    //     const id = props.match.params.id;
    //     dispatch(selectDoctorAction(id));
    // }, []);

    const { doctorSelected, loginUser, loading, error } = useSelector(stateSelector);
    const dispatch = useDispatch();
    // const doctorsProps = {
    //     doctorSelected,
    //     loading,
    //     error,
    // };
    console.info(doctorSelected);
    if (loading) { return <LoadingIndicator />; }
    if (error !== null) {
        return <div>{error}</div>
    }
    else if (doctorSelected.id === null) {
        return <Redirect to={{
            pathname: '/doctors',
            state: { from: props.location }
        }} />
    }
    return (
        <div>
            <Helmet>
                <title>Doctor</title>
                <meta name="description" content="Description of Doctor" />
            </Helmet>
            <div>

                {/* <Calendar {...doctorSelected} /> */}
                <button
                // onClick={
                //     () => createAppointmentAction()
                // }
                ></button>
                <Calendar {...doctorSelected} />
            </div>
        </div>
    );
}

export default memo(MakeAppointment);