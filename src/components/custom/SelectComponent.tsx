import React, {
  ChangeEvent,
  FormEvent,
  MutableRefObject, useEffect,
  useRef,
  useState
} from "react";
import {
  Button, Checkbox,
  FormControl, FormControlLabel, Grid,
  InputLabel,
  ListSubheader,
  MenuItem, Radio, RadioGroup,
  Select, SelectChangeEvent, useRadioGroup,
} from "@mui/material";
type SelectProps = {
  options?: Ioptions[] | undefined,
  onChangeSelect?: (event:SelectChangeEvent<HTMLSelectElement | string>) => void,
}
type Ioptions = {
  value: string,
  text: string
}
const SelectComponent:React.FC<SelectProps> = (props) => {
  const radioRef = useRef() as MutableRefObject<HTMLInputElement>;
  const test = useRadioGroup()
  const handleSubmit = (e:FormEvent)=> {
    e.preventDefault()
    console.log(radioRef.current)
  }

  const handleChangeChkBox = (event:ChangeEvent<HTMLInputElement>) => {
    const targetValue = event.target.value
    const targetChecked = event.target.checked
    const targetIndex = checkboxOption.findIndex((option)=> option.value === targetValue)
    let newDisableCat = [...disableCat]

    if((newDisableCat[0] && targetIndex === 1) || (newDisableCat[1] && targetIndex === 0)) {
      return alert('뼈, 순살 중 하나만')
    } else if ((targetIndex === 0 || targetIndex === 1) && (newDisableCat[2] ||newDisableCat[3] || newDisableCat[4])) {
      return alert('윙 봉 다리 선택중 뼈나 순살 선택 불가')
    } 

    newDisableCat[targetIndex] = targetChecked
    if(newDisableCat[2] && !newDisableCat[3] && newDisableCat[4]) {
      newDisableCat = checkboxOption.map(option => false)
      alert('윙 다리만 선택 불가')
    } else if(!newDisableCat[2] && newDisableCat[3] && newDisableCat[4]) {
      newDisableCat = checkboxOption.map(option => false)
      alert('봉 다리만 선택 불가')
    }

    setDisableCat(newDisableCat)
  }

  const checkboxOption = [
    {id: 1, value: '뼈', label: '뼈'},
    {id: 2, value: '순살', label: '순살'},
    {id: 3, value: '윙', label: '윙'},
    {id: 4, value: '봉', label: '봉'},
    {id: 5, value: '다리', label: '다리'},
  ]
  const [disableCat, setDisableCat] = useState(checkboxOption.map(option => false));

  return <>
    <div style={{marginBottom: '16px'}}>-select-</div>
    <FormControl fullWidth >
      <InputLabel htmlFor={'grouped-select'}>플랫폼</InputLabel>
      <Select
        // id={'grouped-select'}
        labelId={'grouped-select'}
        label={'플랫폼'}
        defaultValue={""}
        fullWidth
        onChange={props.onChangeSelect}
      >
        <ListSubheader>그룹1</ListSubheader>
        {
          props.options && props.options.map(option => (
            <MenuItem
              value={option.value}
              key={`option_${option.value}`}
            >
              {option.text}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
    <FormControl >
      <RadioGroup defaultValue={'123'} onChange={(value) => radioRef.current.value = value.target.value }>
        <FormControlLabel control={<Radio />} label={'123'} value={'123'} />
        <FormControlLabel control={<Radio />} label={'456'} value={'456'} />
        <FormControlLabel control={<Radio />} label={'789'} value={'789'} />
      </RadioGroup>
    </FormControl>
    <Button type={'submit'} variant={'outlined'} onClick={handleSubmit}>제출</Button>
    <FormControl onChange={handleChangeChkBox}>
      <RadioGroup >
        {
          checkboxOption.map((option,idx) => (
            <FormControlLabel
              control={<Checkbox value={option.value} checked={disableCat[idx]} disabled={idx > 1 && (disableCat[0] || disableCat[1])}/>}
              label={option.label}
              key={`formCheckbox_${option.label}`}
            />
          ))
        }
        {/*<FormControlLabel control={<Checkbox name={'checkbox_1'} value={'순살'} />} label={'순살'} />*/}
        {/*<FormControl disabled={disableCat === '뼈' || disableCat === '순살'} >*/}
        {/*  <FormControlLabel control={<Checkbox value={'윙'} />  } label={'윙'} />*/}
        {/*  <FormControlLabel control={<Checkbox value={'봉'} /> } label={'봉'} />*/}
        {/*  <FormControlLabel control={<Checkbox value={'다리'} /> } label={'다리'} />*/}
        {/*</FormControl>*/}

      </RadioGroup>


    </FormControl>
  </>
}

export default SelectComponent