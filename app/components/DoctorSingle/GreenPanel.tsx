import * as React from 'react';
import { Redirect, Route, Link } from 'react-router-dom'
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';
import DoctorItem from 'components/DoctorItem';
import { Doctor } from '../../containers/Doctors/types';

function GreenPanel(doctorSelected: Doctor) {
  const fullAddress = `${doctorSelected.address} ${doctorSelected.suburb},
  ${doctorSelected.addressState} ${doctorSelected.postcode}`;
  return (
    <div>
      <img src='https://picsum.photos/200' />
      <h1>{doctorSelected.doctorName}</h1>
      <div>
        <h5>
          {fullAddress}
        </h5>
        <a href={`https://www.google.com/maps?q=${fullAddress}`} target="_blank">
          MAP
        </a>
      </div>
      <div>
        <h5>
          {doctorSelected.phone}
        </h5>
        <a href={`tel:${doctorSelected.phone}`}>
          CALL
        </a>
      </div>
      <Link to="/make-appointment">See Available Appointent Time</Link>

    </div>
  );

}

export default GreenPanel;
