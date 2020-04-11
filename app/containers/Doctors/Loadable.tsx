/**
 * Asynchronously loads the component for Doctors
 */

import * as React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';

export default loadable(() => import('./Doctors'), {
    fallback: <LoadingIndicator />,
});
