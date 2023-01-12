import {useState} from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import {Box, Button} from "@mui/material";
const DatepickerComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const handleChangeDate = (date:any) => {
    console.log(date)
    setStartDate(date)
  }
  const handleSaveTxt = async () => {
    const test = {id:1, text: 'test1'}
    // await navigator.clipboard.write(test)
    // console.log(await navigator.clipboard.read())
  }
  return <>
    <div>-datepicker-</div>
    <Box component={'div'} width={300} sx={{border: '1px solid',}}>
      <DatePicker
        selected={startDate}
        onChange={handleChangeDate}
        isClearable
        placeholderText={'날짜를 입력해주세요'}
        closeOnScroll
        dateFormat={'yyyy. MM. dd'}
        showTimeSelect
      />
    </Box>
    <Button variant={'outlined'} onClick={handleSaveTxt}>클립보드복사</Button>
  </>;
}

export default DatepickerComponent