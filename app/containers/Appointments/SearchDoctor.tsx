/*
 *
 * User Login
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormError } from 'components/Form';
import { Redirect, Route, Link } from 'react-router-dom'
import { Auth } from "aws-amplify";
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsAuthenticated, makeSelectIsAuthenticating } from "../User/selectors";
import { searchDoctorsAction } from './actions';
import reducer from '../User/reducer';
import saga from '../User/saga';
import messages from '../User/messages';

const stateSelector = createStructuredSelector({
    isAuthenticated: makeSelectIsAuthenticated(),
    isAuthenticating: makeSelectIsAuthenticating(),
});

const validationSchema = Yup.object().shape({
    postcode: Yup.number()
        .min(4, '4 numbers')
});

interface Props { }

function SearchDoctor(props: Props) {
    // Warning: Add your key to RootState in types/index.d.ts file
    useInjectReducer({ key: 'user', reducer: reducer });
    useInjectSaga({ key: 'user', saga: saga });

    // const { isAuthenticated, isAuthenticating } = useSelector(stateSelector);
    const dispatch = useDispatch();
    return (
        <div>
            <Formik
                initialValues={{
                    doctorName: '',
                    postcode: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    const { doctorName, postcode } = values;
                    dispatch(searchDoctorsAction(doctorName, postcode));
                    setTimeout(() => {
                        setSubmitting(false);
                    }, 500);
                }}>
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                        <form
                            onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="doctorName"
                                placeholder="Search by provider name"
                                value={values.doctorName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <FormError
                                touched={touched.doctorName}
                                message={errors.doctorName} />
                            <input
                                type="number"
                                name="postcode"
                                placeholder="Postcode"
                                value={values.postcode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <FormError
                                touched={touched.postcode}
                                message={errors.postcode} />
                            <button type="submit" disabled={isSubmitting}>
                                Search
					                </button>
                        </form>
                    )}
            </Formik>
        </div >
    );
}

export default memo(SearchDoctor);
