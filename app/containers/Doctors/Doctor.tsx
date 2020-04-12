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

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import { makeSelectDoctorSelected, makeSelectLoading, makeSelectError } from "./selectors";
import LoadingIndicator from 'components/LoadingIndicator';

import { selectDoctorAction } from './actions';
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import { GreenPanel, Description } from "components/DoctorSingle";
import SearchDoctor from "./SearchDoctor";
const stateSelector = createStructuredSelector({
    doctorSelected: makeSelectDoctorSelected(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
});

interface Props extends RouteComponentProps<any> { }

function Doctor(props: Props) {
    // Warning: Add your key to RootState in types/index.d.ts file
    useInjectReducer({ key: "doctors", reducer: reducer });
    useInjectSaga({ key: "doctors", saga: saga });

    useEffect(() => {
        // When initial state username is not null, submit the form to load repos
        const id = props.match.params.id;
        dispatch(selectDoctorAction(id));
    }, []);

    const { doctorSelected, loading, error } = useSelector(stateSelector);
    const dispatch = useDispatch();
    // const doctorsProps = {
    //     doctorSelected,
    //     loading,
    //     error,
    // };

    if (loading) { return <LoadingIndicator />; }
    if (error !== null) { return <div>{error}</div> }
    return (
        <div>
            <Helmet>
                <title>Doctor</title>
                <meta name="description" content="Description of Doctor" />
            </Helmet>
            <div>
                <GreenPanel {...doctorSelected} />
                <Description {...doctorSelected} />
            </div>
        </div>
    );
}

export default memo(Doctor);