/*
 *
 * Doctors
 *
 */

import React, { useEffect, memo } from 'react';
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import { makeSelectDoctorsSearched, makeSelectLoading, makeSelectError } from "./selectors";

import { listDoctorsAction } from './actions';
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import DoctorList from "components/DoctorList";
import SearchDoctor from "./SearchDoctor";
const stateSelector = createStructuredSelector({
  doctors: makeSelectDoctorsSearched(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

interface Props { }

function Doctors(props: Props) {
  // Warning: Add your key to RootState in types/index.d.ts file
  useInjectReducer({ key: "doctors", reducer: reducer });
  useInjectSaga({ key: "doctors", saga: saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    dispatch(listDoctorsAction());
  }, []);

  const { doctors, loading, error } = useSelector(stateSelector);
  const dispatch = useDispatch();
  const doctorsProps = {
    doctors,
    loading,
    error,
  };

  return (
    <div>
      <Helmet>
        <title>Doctor</title>
        <meta name="description" content="Description of Doctor" />
      </Helmet>
      <SearchDoctor />
      <h5>Provider Name</h5>
      <DoctorList {...doctorsProps} />
    </div>
  );
}

export default memo(Doctors);