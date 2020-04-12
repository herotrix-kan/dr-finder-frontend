import * as React from 'react';
import { Redirect, Route, Link } from 'react-router-dom'
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';
import DoctorItem from 'components/DoctorItem';
import { Doctor } from '../../containers/Doctors/types';

function Description(doctorSelected: Doctor) {
  return (
    <div>
      <h3>Professional Statement</h3>
      <div>
        {doctorSelected.introduction}
      </div>
    </div>
  );

}

export default Description;
