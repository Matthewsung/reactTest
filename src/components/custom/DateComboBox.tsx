import React, {ChangeEvent, FC, SyntheticEvent, useState} from "react";
import {
  Autocomplete, Button,
  Chip,
  MenuItem,
  Paper,
  Select,
  TextField
} from "@mui/material";
import DatePicker, {
  ReactDatePickerCustomHeaderProps,
  ReactDatePickerProps
} from 'react-datepicker'
import styled from "styled-components";
import {AddBusiness} from "@mui/icons-material";


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
  }
  const handleChangeDate = (newVal:any) => {
    // console.log( newVal)
    const [start, end] = newVal
    setStartDate(start)
    setEndDate(end)
  }
  const CustomHeader = (props:ReactDatePickerCustomHeaderProps) => {
    return (
      <div className={'customHead'}>
        <Button variant={'outlined'} onClick={props.decreaseMonth} size={'small'}> - </Button>
        <div>
          {
            `${props.date.getFullYear()}년 ${props.date.getMonth() + 1}월`
          }
        </div>
        <Button variant={'outlined'} onClick={props.increaseMonth} size={'small'}> + </Button>
      </div>
    )
  }
  const CustomDay = (day: string) => {
    let calcDay
    switch (day) {
      case 'Sunday':
        return calcDay = '일'
      case 'Monday':
        return calcDay = '월'
      case 'Tuesday':
        return calcDay = '화'
      case 'Wednesday':
        return calcDay = '수'
      case 'Thursday':
        return calcDay = '목'
      case 'Friday':
        return calcDay = '금'
      case 'Saturday':
        return calcDay = '토'
    }
    return <span>{calcDay}</span>
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
          startDate={startDate}
          endDate={endDate}
          selectsRange
          onChange={handleChangeDate}
          isClearable
          renderCustomHeader={CustomHeader}
          formatWeekDay={CustomDay}
          maxDate={new Date()}
          dateFormat={"yyyy.MM.dd"}
        >
          <div className={'innerText'}>시작 날짜, 끝 날짜 모두 선택해주세요</div>
        </DatePicker>
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


  .innerText {
    color: red;
    font-size: 14px;
  }

  .react-datepicker__header {
    background: #fff;

    .customHead {
      padding: 4px 8px;
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: space-between;
    }
  }

  .react-datepicker-wrapper {
    width: auto;
    border: 1px solid #ddd;
    padding: 8px;

    .react-datepicker__close-icon {
      //border: 1px solid #6a6a6a;
      //border-radius: 50%;
      padding: 1px 0;

      &::after {
        font-size: 16px;
        background: #fff;
        color: #6a6a6a;
      }
    }
  }

  .react-datepicker__week {
    display: flex;

    .react-datepicker__day {
      flex: 1 0 0;
      padding: 1px 4px;
      margin: 0;
      border-radius: 0;

      &:hover {
        background: #238907;
        color: #fff;;
      }

      &.react-datepicker__day--selected,
      &.react-datepicker__day--in-range,
      &.react-datepicker__day--in-selecting-range {
        background: #d6f1ce;

      }

      &.react-datepicker__day--selecting-range-start,
      &.react-datepicker__day--range-start {
        background: #bdff71;
        border-radius: 16px 0 0 16px;
      }

      &.react-datepicker__day--range-end {
        background: #bdff71;
        border-radius: 0 16px 16px 0;
      }
    }
  }


`