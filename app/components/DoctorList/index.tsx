import * as React from 'react';
import { Redirect, Route, Link } from 'react-router-dom'
import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import styled from 'styles/styled-components';
import DoctorItem from 'components/DoctorItem';
import { ContainerState } from '../../containers/Doctors/types';

// export type DoctorListProps = Pick<ContainerState, 'loading' | 'error'> & Pick<UserData, 'repos'>;
export type DoctorListProps = Pick<ContainerState, 'doctors' | 'loading' | 'error'>;
function DoctorList({ doctors, loading, error }: DoctorListProps) {
  const DoctorListWrap = styled.div`
  display: flex;
  background-color:#fff;
  flex-direction: column;
`;
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== null) {
    return <div>{error}</div>
  }
  if (doctors !== undefined) {
    return <DoctorListWrap>
      {doctors.map((doctorItem) => (
        <Link to={`/doctor/${doctorItem.id}`} key={`item - ${doctorItem.id}`}>
          <DoctorItem doctorItem={doctorItem} />
        </Link >
      ))}
    </DoctorListWrap>

  }

  return null;
}

export default DoctorList;
