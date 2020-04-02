/*
 *
 * User
 *
 */

import React, { useState } from 'react';
import { Auth } from "aws-amplify";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormError } from 'components/Form';
import { Helmet } from 'react-helmet';
import { useFormFields } from "utils/hooksLib";

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

interface Props { }
interface IUser {
  username: string;
  password: string;
}

function Register(props: Props) {
  const [newUser, setNewUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(username, password) {
    // event.preventDefault();
    setIsLoading(true);
    try {
      const newUser = await Auth.signUp({
        username,
        password,
      });
      setIsLoading(false);
      if (newUser) {
        setNewUser({
          username,
          password,
        });
      }

    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(confirmationCode) {
    // event.preventDefault();

    setIsLoading(true);
    try {
      await Auth.confirmSignUp(newUser.username, confirmationCode);
      await Auth.signIn(newUser.username, newUser.password);

      // props.userHasAuthenticated(true);
      // props.history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

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
            handleSubmit(username, password);
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
        validationSchema={validationConfirmationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          const { confirmationCode } = values;
          console.info("confirmationCode:", confirmationCode);
          handleConfirmationSubmit(confirmationCode);
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
                value={values.confirmationCode}
                onChange={handleChange}
                // onChange={() => { console.info(values.confirmationCode) }}
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
        <title>Register</title>
        <meta name="description" content="Description of User" />
      </Helmet>
      <div className="Login">
        <h1>User Register</h1>
        {newUser === null ? confirmationForm() : registerForm()}
      </div>
    </div>
  );
}

export default Register;
