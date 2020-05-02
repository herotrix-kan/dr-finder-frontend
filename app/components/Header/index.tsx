import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Auth } from "aws-amplify";
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { userReturnLoginAction } from 'containers/User/actions';
import { makeSelectIsAuthenticated } from "containers/User/selectors";
import reducer from 'containers/User/reducer';
import saga from 'containers/User/saga';


import A from './A';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import styled from 'styles/styled-components';
import Img from './Img';
import Banner from './banner.jpg';
import messages from './messages';

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  background-color:#fff;
  padding:25px;
`;

const stateSelector = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
});

function Header({ appProps }) {
  return (
    <HeaderWrap>
      <div>
        <Img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" />
      </div>
      <NavBar>
        <HeaderLink to="/">
          Home
        </HeaderLink>
        {/* <HeaderLink to="/features">
          <FormattedMessage {...messages.features} />
        </HeaderLink> */}
        <HeaderLink to="/appointments">
          Appointments
        </HeaderLink>

        <button onClick={appProps.handleLogout}>Logout</button>
      </NavBar>
    </HeaderWrap>
  );

}

export default Header;
