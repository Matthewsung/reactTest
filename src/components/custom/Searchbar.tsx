import React, {
  KeyboardEvent,
  MutableRefObject
} from "react";
import styled from "styled-components";
import {Button, Grid, TextField} from "@mui/material";

const Searchbar:React.FC<{
  innerRef: MutableRefObject<HTMLInputElement>,
  handleSearch: () => void
}> = (props, context) => {
  const handleInputKeyDown = (event:KeyboardEvent) => {
    if(event.key === 'Enter') {
      props.handleSearch()
    }
  }
  return <SearchBox>
    <CustomTextField size={'small'} inputRef={props.innerRef} onKeyDown={handleInputKeyDown} autoFocus/>
    <CustomButton variant={'outlined'} onClick={props.handleSearch}>
      검색
    </CustomButton>
  </SearchBox>
}
export default Searchbar

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`
const CustomTextField = styled(TextField)`
  background: #fff;
`
const CustomButton = styled(Button)`
  
`