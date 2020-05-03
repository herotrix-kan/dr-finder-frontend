import styled from 'styles/styled-components';
import { Redirect, Route, Link } from 'react-router-dom'
const Item = styled(Link)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;
  margin-bottom:1em;
  background-color:#fff;
  padding:15px 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px 5px #e5e5e5;
`;

export default Item;