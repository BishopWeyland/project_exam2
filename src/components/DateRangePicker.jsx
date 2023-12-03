import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CalendarComponent = ({ onChange }) => {
  const [state, setState] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const handleDateChange = (item) => {
    console.log("CalendarComponent - Date change item:", item);
    setState([item.selection]);
    onChange(item.selection);
  };

  return (
    <div className="flex justify-center">
      <DateRange
        editableDateInputs={true}
        onChange={handleDateChange}
        moveRangeOnFirstSelection={false}
        ranges={state}
        showDateDisplay={false}
        showMonthAndYearPickers={false}
        minDate={new Date()}
      />
    </div>
  );
};

export default CalendarComponent;
