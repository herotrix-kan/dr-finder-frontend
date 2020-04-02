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

interface Props { }

function User(props: Props) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(username, password) {
    // event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(username, password);
      // props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }
  return (
    <div>
      <Helmet>
        <title>User</title>
        <meta name="description" content="Description of User" />
      </Helmet>
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
            handleSubmit(username, password);
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
}

export default User;
