import * as React from 'react';

import Item from './Item';

function ListItem({ doctorItem }) {
  return (
    <Item to={`/doctor/${doctorItem.id}`} key={`item - ${doctorItem.id}`}>
      <img src='https://picsum.photos/50' />
      <div>
        <h5>{doctorItem.doctorName}</h5>
        <p>{doctorItem.hospitalName}</p>
      </div>
    </Item>
  );
}


export default ListItem;