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
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';


const stateSelector = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
});

interface Props {
  location: string;
}
function Header(props: Props) {
  return (
    <div>
      <NavBar>
        <HeaderLink to="/doctors">
          Home
        </HeaderLink>
        {/* <HeaderLink to="/features">
          <FormattedMessage {...messages.features} />
        </HeaderLink> */}
        <HeaderLink to="/appointments">
          Appointments
        </HeaderLink>
      </NavBar>
    </div>
  );

}

export default Header;
