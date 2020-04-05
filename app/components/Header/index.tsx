import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { userReturnLoginAction } from 'containers/User/actions';
import { makeSelectIsAuthenticated } from "containers/User/selectors";

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
  const { isAuthenticated } = useSelector(stateSelector);

  // if (!isAuthenticated) return (<Redirect to={{
  //   pathname: '/login',
  //   state: { from: props.location }
  // }} />);

  return (
    <div>
      <A href="https://www.reactboilerplate.com/">
        <Img src={Banner} alt="react-boilerplate - Logo" />
      </A>
      <NavBar>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/features">
          <FormattedMessage {...messages.features} />
        </HeaderLink>
      </NavBar>
    </div>
  );

}

export default Header;
