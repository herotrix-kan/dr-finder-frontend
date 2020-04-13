import React, { useState } from 'react';
import { Redirect, Route, Link } from 'react-router-dom'
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';
import DoctorItem from 'components/DoctorItem';
import { Doctor } from '../../containers/Doctors/types';

// export type DoctorListProps = Pick<ContainerState, 'loading' | 'error'> & Pick<UserData, 'repos'>;
function Calendar(doctorSelected: Doctor) {
  const [dateSelected, dateSelect] = useState(moment());
  const onChange = e => dateSelect(e.target.value);

  const [focused, setFocused] = useState(false);
  const availableHoursObject = unescape(doctorSelected.availableHours);
  const bookedHoursObject = unescape(doctorSelected.bookedHours);

  const availableDates = ["2020-04-15", "2020-04-20"];
  const isBlocked = (day: any) => {
    return availableDates.some(date => day.isSame(date), 'day')
  }
  { console.info("availableHoursObject:", availableHoursObject) }
  { console.info("bookedHoursObject:", bookedHoursObject) }
  return (
    <div>
      <SingleDatePicker
        date={dateSelected} // momentPropTypes.momentObj or null
        // onDateChange={(date: any) => dateSelect(date)} // PropTypes.func.isRequired
        numberOfMonths={window.innerWidth < 600 ? 1 : 2}
        onDateChange={date => onChange({ target: { value: date } })}
        focused={focused} // PropTypes.bool
        onFocusChange={({ focused }: any) => setFocused(focused)} // PropTypes.func.isRequired
        // isDayBlocked={isBlocked}
        isDayBlocked={m => m.day() === 6 || m.day() === 0}
        // isOutsideRange={(day: any)=>!isInclusivelyAfterDay(day, moment())}
        id="1" // PropTypes.string.isRequired,
      />

    </div>
  );

}

export default Calendar;
