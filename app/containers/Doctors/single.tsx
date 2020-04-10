/*
 *
 * Doctor
 *
 */

import React, { useEffect, memo } from 'react';
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import { makeSelectDoctorSelected, makeSelectLoading, makeSelectError } from "./selectors";

import { selectDoctorAction } from './actions';
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import DoctorList from "components/DoctorList";
import SearchDoctor from "./SearchDoctor";
const stateSelector = createStructuredSelector({
    doctorSelected: makeSelectDoctorSelected(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
});

interface Props { }

function Doctor(props: Props) {
    // Warning: Add your key to RootState in types/index.d.ts file
    useInjectReducer({ key: "doctors", reducer: reducer });
    useInjectSaga({ key: "doctors", saga: saga });

    useEffect(() => {
        // When initial state username is not null, submit the form to load repos
        const { match: { params } } = props;
        dispatch(selectDoctorAction('id'));
    }, []);

    const { doctorSelected, loading, error } = useSelector(stateSelector);
    const dispatch = useDispatch();
    const doctorsProps = {
        doctorSelected,
        loading,
        error,
    };

    if (loading) { return }
    return (
        <div>
            <Helmet>
                <title>Doctor</title>
                <meta name="description" content="Description of Doctor" />
            </Helmet>
            <SearchDoctor />
            <h3>Provider Name</h3>
            <DoctorList {...doctorsProps} />
        </div>
    );
}

export default memo(Doctor);