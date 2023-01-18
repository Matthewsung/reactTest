import React, {ChangeEvent, FC, SyntheticEvent, useState} from "react";
import {
  Autocomplete,
  Chip,
  MenuItem,
  Paper,
  Select,
  TextField
} from "@mui/material";
import DatePicker, {
  ReactDatePicker,
  ReactDatePickerProps

} from 'react-datepicker'
import styled from "styled-components";

const DateComboBox:FC<{}> = (props) => {
  const dateOption = ['어제', '지난 1주일', '지난 2주일', '지난 한달', '날짜선택']
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const handleChangeValue = (event:SyntheticEvent<Element, Event>, selected:string[]) => {
    if(selected.length > 1) {
      selected.splice(0,1)
    }

    if(selected[0] === '날짜선택') {
      setIsDatePicker(true)
    } else {
      setIsDatePicker(false)

    }
    console.log(event,selected)
  }
  const handleChangeDate = (newVal:any ) => {
    console.log( newVal)
  }
  return (
    <Paper>
      <Autocomplete
        multiple
        size={'small'}
        renderInput={ params => <TextField {...params}/> }
        options={dateOption}
        renderTags={ (value, getTagProps) => {
          return (
            value.map((option, index) =>{
              return <Chip
                {...getTagProps({index})}
                label={option}
                color={'primary'}
                variant={'outlined'}
              />
            })
          )
        }}
        onChange={handleChangeValue}
      />

    { isDatePicker &&
      <CustomDatePicker>
        <DatePicker
          selected={startDate}
          onChange={handleChangeDate}
        />
        -
        <DatePicker
          selected={endDate}
          onChange={handleChangeDate}
        />
      </CustomDatePicker>
    }
    </Paper>
  )
}

export default DateComboBox

const CustomDatePicker = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  .react-datepicker-wrapper {
    width: auto;
    border: 1px solid #ddd;
    padding: 8px;
    
  }
`