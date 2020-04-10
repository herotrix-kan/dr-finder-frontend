import * as React from 'react';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';
import DoctorItem from 'components/DoctorItem';
import { ContainerState, Doctor } from '../../containers/Doctors/types';

// export type DoctorListProps = Pick<ContainerState, 'loading' | 'error'> & Pick<UserData, 'repos'>;
export type DoctorListProps = Pick<ContainerState, 'doctors' | 'loading' | 'error'>;
function DoctorList({ doctors, loading, error }: ContainerState) {

  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== null) {
    return <div>{error}</div>
  }
  if (doctors !== undefined) {
    return doctors.map((doctorItem: Doctor) => (
      <DoctorItem key={`item-${doctorItem.id}`} doctorItem={doctorItem} />
    ));
  }

  return null;
}

export default DoctorList;
