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
  const weekdays = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const onChange = e => dateSelect(e.target.value);

  const [focused, setFocused] = useState(false);
  const availableHoursObject = JSON.parse(doctorSelected.availableHours.replace(/\"/g, "\""));
  const bookedHoursObject = JSON.parse(doctorSelected.bookedHours.replace(/\"/g, "\""));

  const getDateSelected = dateSelected.format('YYYY-MM-DD');
  const getDaySelected = weekdays[dateSelected.isoWeekday()];
  const getDaySelectedAvailableHours = availableHoursObject[getDaySelected];

  let unvailableDates = [];
  for (let [key, value] of Object.entries(availableHoursObject)) {
    console.log(`${key}: ${value}`);
    if (value.length === 0) {
      unvailableDates.push(key);
    }
  }
  { console.info("availableHoursObject:", availableHoursObject) }
  { console.info("unvailableDates:", unvailableDates) }
  { console.info("bookedHoursObject:", bookedHoursObject) }
  { console.info("date selected:", getDateSelected) }
  { console.info("day selected:", getDaySelected) }
  { console.info("show available time:", getDaySelectedAvailableHours) }
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
        // isDayBlocked={m => m.day() === 6 || m.day() === 0}
        isDayBlocked={(day: any) => unvailableDates.includes(moment.weekdays(day.weekday()))}
        // isOutsideRange={(day: any)=>!isInclusivelyAfterDay(day, moment())}
        id="1" // PropTypes.string.isRequired,
      />
      <div>
        <h3>Available hours of the selected date</h3>
        {getDaySelectedAvailableHours &&
          getDaySelectedAvailableHours.map((hours, key) => (
            <p key={`key-${key}`}>{hours}</p>
          ))}
      </div>
    </div>
  );

}

export default Calendar;
