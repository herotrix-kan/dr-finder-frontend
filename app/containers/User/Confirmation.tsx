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

  return (
    <div>
      <Helmet>
        <title>User Login</title>
        <meta name="description" content="Description of User" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <div className="Login">
        <h1>User Confirmation</h1>
        <Formik
          initialValues={{
            code: '',
          }}
          // validationSchema={validationConfirmationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.info("confirmationCode:");
            setSubmitting(true);
            const { code } = values;
            console.info("confirmationCode:", code);
            dispatch(userConfirmRegisterAction(usernameState, code));
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
                  name="confirmation"
                  placeholder="Confirmation Code"
                  value={values.password || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormError
                  touched={touched.password}
                  message={errors.password} />
                <p>Please check your email for the code.</p>
                <button type="submit" disabled={isSubmitting}>
                  Verify
            </button>
              </form>
            )}
        </Formik>
        {/* {!isCodeSent ? confirmationForm() : registerForm()} */}
      </div>
    </div>
  );
}

export default memo(Register);
