/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styles/styled-components';
import { Switch, Route } from 'react-router-dom';
import config from 'utils/config';
import Amplify, { Auth } from 'aws-amplify';

import { Doctors, Doctor } from 'containers/Doctors';
import { Login, Register, Confirmation } from 'containers/User';
import { userReturnLoginAction } from 'containers/User/actions';
import { useDispatch } from 'react-redux';
import { MakeAppointment, ConfirmAppointment, Appointments } from 'containers/Appointments';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    graphql_endpoint: config.apiGateway.URL,
  },
});

export default function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const dispatch = useDispatch();
  React.useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const response = await Auth.currentSession();
      const id = response.idToken.payload.sub;
      dispatch(userReturnLoginAction(id));
      userHasAuthenticated(true);
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }


  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/confirmation" component={Confirmation} />
        <Route exact path="/features" component={FeaturePage} />
        <Route exact path="/doctors" component={Doctors} />
        <Route exact path="/appointments" component={Appointments} />
        <Route exact path="/doctor/:id" component={Doctor} />
        <Route exact path="/make-appointment" component={MakeAppointment} />
        <Route exact path="/confirm-appointment" component={ConfirmAppointment} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );

}
