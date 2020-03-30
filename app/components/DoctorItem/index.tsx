import * as React from 'react';

import Item from './Item';
import Wrapper from './Wrapper';

function ListItem({ doctorItem }) {
  return (
    <Wrapper>
      <Item>
        <img src={doctorItem.posterPath} />
        <h5>{doctorItem.title}</h5>
      </Item>
    </Wrapper>
  );
}


export default ListItem;
