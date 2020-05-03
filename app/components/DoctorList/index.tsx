import * as React from 'react';
import { Redirect, Route, Link } from 'react-router-dom'
import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import styled from 'styles/styled-components';
import DoctorItem from 'components/DoctorItem';
import Wrapper from './Wrapper';
import { ContainerState } from '../../containers/Doctors/types';

// export type DoctorListProps = Pick<ContainerState, 'loading' | 'error'> & Pick<UserData, 'repos'>;
export type DoctorListProps = Pick<ContainerState, 'doctors' | 'loading' | 'error'>;
function DoctorList({ doctors, loading, error }: DoctorListProps) {

  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== null) {
    return <div>{error}</div>
  }
  if (doctors !== undefined) {
    return <Wrapper>
      {doctors.map((doctorItem) => (
        <DoctorItem doctorItem={doctorItem} />
      ))}
    </Wrapper>

  }

  return null;
}

export default DoctorList;
