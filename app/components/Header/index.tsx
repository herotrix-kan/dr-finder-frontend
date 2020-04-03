import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Auth } from "aws-amplify";
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { userReturnLoginAction } from 'containers/User/actions';
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
  const dispatch = useDispatch();

  React.useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const response = await Auth.currentSession();
      const id = response.idToken.payload.sub;
      dispatch(userReturnLoginAction(id));
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  }
  if (isAuthenticated)
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
  else return (<Redirect to={{
    pathname: '/login',
    state: { from: props.location }
  }} />);
}

export default Header;
