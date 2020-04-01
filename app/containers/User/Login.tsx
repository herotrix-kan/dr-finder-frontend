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
import { Auth } from "aws-amplify";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormError } from 'components/Form';


import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectIsAuthenticated } from "./selectors";
import { userLoginAction } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const stateSelector = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
});

interface Props { }

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

  const { isAuthenticated } = useSelector(stateSelector);
  const dispatch = useDispatch();

  if (!isAuthenticated)
    return (
      <div>
        <Helmet>
          <title>User Login</title>
          <meta name="description" content="Description of User" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <div className="Login">
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
              dispatch(userLoginAction(username, password));;
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
                    type="text"
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
        </div>
      </div>
    );

  else return (<div>redirect to home</div>);
}

export default memo(Login);
