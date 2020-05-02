import { Link } from 'react-router-dom';
import styled from 'styles/styled-components';

export default styled(Link)`
  color: #9a9a9a;
  margin:0 15px;
  text-decoration:none;
  font-size:13px;
  &:active, &:hover {
    color: #000;
  }
`;
