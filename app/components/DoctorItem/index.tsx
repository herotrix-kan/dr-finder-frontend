import * as React from 'react';

import Item from './Item';
import Wrapper from './Wrapper';

function ListItem({ doctorItem }) {
  return (
    <Wrapper>
      <Item>
        <img src='https://picsum.photos/200' />
        <h5>{doctorItem.doctorName}</h5>
      </Item>
    </Wrapper>
  );
}


export default ListItem;
