import * as React from 'react';
import { Redirect, Route, Link } from 'react-router-dom'
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';
import DoctorItem from 'components/DoctorItem';
import { ContainerState, Doctor } from '../../containers/Doctors/types';

// export type DoctorListProps = Pick<ContainerState, 'loading' | 'error'> & Pick<UserData, 'repos'>;
export type DoctorListProps = Pick<ContainerState, 'doctorSelected'>;
function Agender(doctorSelected: Doctor) {
  return (
    <div>
      <h3>Professional Statement</h3>
      <div>
        {doctorSelected.introduction}
      </div>
    </div>
  );

}

export default Agender;
