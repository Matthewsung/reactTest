import {
  Autocomplete,
  Chip,
  Paper,
  TextField,
} from "@mui/material";
import React, {ChangeEvent, SyntheticEvent} from "react";
import styled from "styled-components";
import {jsx} from "@emotion/react";

type IAutoCompleteOption = {
  id: number,
  value: string
}
const ComboBoxComponent:React.FC<
  {
    options: IAutoCompleteOption[],
    handleChange: (event:SyntheticEvent<Element, Event>, newVal:IAutoCompleteOption ) => void
  }
> = (props) => {

  return (
    <Paper>
      <CustomAutoComplete
        size={'small'}
        multiple
        renderInput={(params, ) => <TextField {...params} /> }
        options={ props.options}
        getOptionLabel={(option:any) => option.value}
        renderTags={
          ( value, getTagProps) =>  value.map((option:any, index) => <CustomClip {...getTagProps({ index })} label={option.value} variant={'outlined'} color={'primary'} /> )
        }
        onChange={(event, newVal:any) => props.handleChange(event, newVal)}
        // groupBy={option =>  option.id < 3 ? '1번': '2번'}
      />
    </Paper>
  )

}
export default ComboBoxComponent

// style
const CustomAutoComplete = styled(Autocomplete)`
  .MuiInputBase-root { 
    padding: 4px ;
  }
`
const CustomClip = styled(Chip)`

`