import React, {
  FormEvent,
  MutableRefObject,
  RefAttributes,
  RefObject,
  useRef
} from "react";
import {
  Button,
  FormControl, FormControlLabel,
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
  const radioRef = useRef<HTMLInputElement>();
  const test = useRadioGroup()
  const handleSubmit = (e:FormEvent)=> {
    e.preventDefault()
    console.log(radioRef.current)
  }
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
  </>
}

export default SelectComponent