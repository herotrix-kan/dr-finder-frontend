/*
 *
 * User Login
 *
 */

import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormError } from 'components/Form';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectiIsCodeSent } from "./selectors";
import { userRegisterAction, userConfirmRegisterAction } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const stateSelector = createStructuredSelector({
  isCodeSent: makeSelectiIsCodeSent(),
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
const validationConfirmationSchema = Yup.object().shape({
  confirmationCode: Yup.string().required('Must enter a code')
});

function Register(props: Props) {
  const [usernameState, setUsernameState] = useState<string>('');
  // Warning: Add your key to RootState in types/index.d.ts file
  useInjectReducer({ key: 'user', reducer: reducer });
  useInjectSaga({ key: 'user', saga: saga });

  const { isCodeSent } = useSelector(stateSelector);
  const dispatch = useDispatch();

  function registerForm() {
    return (
      <Formik
        initialValues={{
          username: '',
          password: '',
          passwordConfirm: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          const { username, password, passwordConfirm } = values;
          if (password === passwordConfirm) {
            dispatch(userRegisterAction(username, password));
            setUsernameState(username);
          }
          else {
            alert("Two password don't match");
          }
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
              <input
                type="password"
                name="passwordConfirm"
                placeholder="Password Confirm"
                value={values.passwordConfirm}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormError
                touched={touched.passwordConfirm}
                message={errors.passwordConfirm} />
              <button type="submit" disabled={isSubmitting}>
                Register
            </button>
            </form>
          )}
      </Formik>
    );
  }
  function confirmationForm() {
    return (
      <Formik
        initialValues={{
          confirmationCode: '',
        }}
        // validationSchema={validationConfirmationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          const { confirmationCode } = values;
          dispatch(userConfirmRegisterAction("70129300@qq.com", confirmationCode));
          // dispatch(userConfirmRegisterAction(usernameState, confirmationCode));
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
                name="confirmationCode"
                placeholder="Confirmation Code"
                value={values.confirmationCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormError
                touched={touched.confirmationCode}
                message={errors.confirmationCode} />
              <p>Please check your email for the code.</p>
              <button type="submit" disabled={isSubmitting}>
                Verify
          </button>
            </form>
          )}
      </Formik>
    );
  }

  return (
    <div>
      <Helmet>
        <title>User Login</title>
        <meta name="description" content="Description of User" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <div className="Login">
        <h1>User Register</h1>
        {isCodeSent ? confirmationForm() : registerForm()}
      </div>
    </div>
  );
}

export default memo(Register);
