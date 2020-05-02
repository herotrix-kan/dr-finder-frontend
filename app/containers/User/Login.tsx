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
import { makeSelectIsAuthenticated, makeSelectIsAuthenticating } from "./selectors";
import { userLoginAction, userReturnLoginAction } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


interface Props {
  location: string;
  isAuthenticated: boolean;
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Must be more than 3 characters')
    .max(50, 'Must be shoter than 50')
    .required('Must enter a username'),
  password: Yup.string()
    .min(3, 'Must be more than 3 characters')
    .max(50, 'Must be shoter than 50')
    .required('Must enter a password'),
});

function Login(props: Props) {
  // Warning: Add your key to RootState in types/index.d.ts file
  useInjectReducer({ key: 'user', reducer: reducer });
  useInjectSaga({ key: 'user', saga: saga });

  const dispatch = useDispatch();

  return (
    <div>
      <Helmet>
        <title>User Login</title>
        <meta name="description" content="Description of User" />
      </Helmet>
      <div>
        <h1>User Login</h1>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            const { username, password } = values;
            dispatch(userLoginAction(username, password));
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
                  name="username"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormError
                  touched={touched.username}
                  message={errors.username} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormError
                  touched={touched.password}
                  message={errors.password} />
                <button type="submit" disabled={isSubmitting}>
                  Login
					</button>
              </form>
            )}
        </Formik>
        <Link to="/register">Register</Link>

      </div>
    </div >
  );

}

export default memo(Login);
