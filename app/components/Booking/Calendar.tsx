import * as React from 'react';
import { Redirect, Route, Link } from 'react-router-dom'
// import SimpleReactCalendar from 'simple-react-calendar'
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';
import DoctorItem from 'components/DoctorItem';
import { Doctor } from '../../containers/Doctors/types';

// export type DoctorListProps = Pick<ContainerState, 'loading' | 'error'> & Pick<UserData, 'repos'>;
function Calendar(doctorSelected: Doctor) {
  const availableHoursObject = unescape(doctorSelected.availableHours);
  const bookedHoursObject = unescape(doctorSelected.bookedHours);
  { console.info("availableHoursObject:", availableHoursObject) }
  { console.info("bookedHoursObject:", bookedHoursObject) }
  return (
    <div>
      {/* <SimpleReactCalendar activeMonth={new Date()} /> */}
    </div>
  );

}

export default Calendar;
