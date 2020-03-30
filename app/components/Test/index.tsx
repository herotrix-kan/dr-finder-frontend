/**
 *
 * Test
 *
 */
import React, { memo } from 'react';

// import styled from 'styles/styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

interface Props {}

function Test(props: Props) {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

export default memo(Test);
