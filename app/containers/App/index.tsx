/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useState } from 'react';
import styled from 'styles/styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import config from 'utils/config';
import Amplify, { Auth } from 'aws-amplify';
import { push } from 'connected-react-router';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Doctors, Doctor } from 'containers/Doctors';
import { Login, Register, Confirmation } from 'containers/User';
import { userReturnLoginAction } from 'containers/User/actions';
import reducer from 'containers/User/reducer';
import saga from 'containers/User/saga';
import { useDispatch } from 'react-redux';
import { MakeAppointment, ConfirmAppointment, Appointments } from 'containers/Appointments';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { UnauthenticatedRoute, AuthenticatedRoute } from 'components/Route';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  min-height: 100%;
`;
const Container = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 20px auto;
  display: flex;
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

export default function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const dispatch = useDispatch();
  useInjectReducer({ key: 'user', reducer: reducer });
  useInjectSaga({ key: 'user', saga: saga });
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
      userHasAuthenticated(false);
      if (e !== 'No current user') {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    push("/login");
  }

  return (
    !isAuthenticating && (
      <AppWrapper>
        {isAuthenticated ? (
          <Header appProps={{ handleLogout }} />
        ) :
          (<Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />)}
        <Container>
          <Switch>
            <AuthenticatedRoute exact path="/" component={Doctors} appProps={{ isAuthenticated, userHasAuthenticated }} />
            <UnauthenticatedRoute exact path="/login" component={Login} appProps={{ isAuthenticated, userHasAuthenticated }} />
            <UnauthenticatedRoute exact path="/register" component={Register} appProps={{ isAuthenticated, userHasAuthenticated }} />
            <AuthenticatedRoute exact path="/confirmation" component={Confirmation} appProps={{ isAuthenticated, userHasAuthenticated }} />
            <AuthenticatedRoute exact path="/appointments" component={Appointments} appProps={{ isAuthenticated, userHasAuthenticated }} />
            <AuthenticatedRoute exact path="/doctor/:id" component={Doctor} appProps={{ isAuthenticated, userHasAuthenticated }} />
            <AuthenticatedRoute exact path="/make-appointment" component={MakeAppointment} appProps={{ isAuthenticated, userHasAuthenticated }} />
            <AuthenticatedRoute exact path="/confirm-appointment" component={ConfirmAppointment} appProps={{ isAuthenticated, userHasAuthenticated }} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </Container>
        <Footer />
        <GlobalStyle />
      </AppWrapper>
    )
  );

}
