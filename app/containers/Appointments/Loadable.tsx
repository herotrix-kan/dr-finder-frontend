/**
 * Asynchronously loads the component for Appointments
 */

import * as React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';

export default loadable(() => import('./Appointments'), {
    fallback: <LoadingIndicator />,
});
