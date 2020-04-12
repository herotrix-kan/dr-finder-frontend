// /**
//  *
//  * Tests for Doctors
//  *
//  * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
//  *
//  */

// import React from 'react';
// import { render } from '@testing-library/react';
// import { IntlProvider } from 'react-intl';
// import { Provider } from 'react-redux';
// import { browserHistory } from 'react-router-dom';

// import Doctors from '../index';
// import { DEFAULT_LOCALE } from '../../../i18n';
// import configureStore from '../../../configureStore';
// describe('<Doctors />', () => {
//   let store;

//   beforeEach(() => {
//     store = configureStore({}, browserHistory);
//   });

//   it('Expect to not log errors in console', () => {
//     const spy = jest.spyOn(global.console, 'error');
//     render(
//       store as Provider= { store } >
//       locale as IntlProvider= { DEFAULT_LOCALE } >
//       /> as Doctors
//       < /IntlProvider>
//     < /Provider>,,,,,,,,,,,
//     );
//     expect(spy).not.toHaveBeenCalled();
//   });

//   it('Expect to have additional unit tests specified', () => {
//     expect(true).toEqual(false);
//   });

//   /**
//    * Unskip this test to use it
//    *
//    * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
//    */
//   it.skip('Should render and match the snapshot', () => {
//     const {
//       container: { firstChild },
//     } = render(
//       store as Provider= { store } >
//       locale as IntlProvider= { DEFAULT_LOCALE } >
//       /> as Doctors
//       < /IntlProvider>
//     < /Provider>,,,,,,,,,,,
//     );
//     expect(firstChild).toMatchSnapshot();
//   });
// });
