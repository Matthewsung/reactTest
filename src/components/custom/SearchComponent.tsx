import React, {KeyboardEvent} from 'react';
import {
  Paper, InputBase,
  Divider,
  IconButton, TextField, Button, Box, Grid, Chip, Stack, Autocomplete,
} from '@mui/material';
import { Search }from '@mui/icons-material'

type ISearchOption = string | undefined
const SearchComponent:React.FC<{
  innerRef:React.RefObject<HTMLInputElement> | null,
  clickSearch: () => void,
  testRef:React.RefObject<HTMLInputElement> | null,
  testClick : () => void
  searchOptions : ISearchOption[],
  deleteOption: (value:ISearchOption) => void
}> = (props) => {
  const handleKeyDown = (event:KeyboardEvent<Element>) => {
    if(event.key === 'Enter') {
      props.testClick()
    }
  }

  const autoOption = [
    {id: 1, value: 'item_1'},
    {id: 2, value: 'item_2'},
    {id: 3, value: 'item_3'},
    {id: 4, value: 'item_4'},
    {id: 5, value: 'item_5'},
    {id: 6, value: 'item_6'},
  ]

  return <>
    <div>-Search Bar-</div>
    {/*<Paper*/}
    {/*  component="form"*/}
    {/*  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}*/}
    {/*>*/}
    {/*  <InputBase*/}
    {/*    sx={{ ml: 1, flex: 1 }}*/}
    {/*    placeholder="검색어를 입력하세요"*/}
    {/*    inputRef={ props.innerRef }*/}
    {/*  />*/}
    {/*  <IconButton*/}
    {/*    type="button"*/}
    {/*    sx={{ p: '10px' }}*/}
    {/*    aria-label="search"*/}
    {/*    onClick={props.clickSearch}*/}
    {/*  >*/}
    {/*    <Search />*/}
    {/*  </IconButton>*/}
    {/*</Paper>*/}
    <Stack direction={'row'} spacing={1}>
      {
        props.searchOptions && props.searchOptions.map(option => (
          <Chip
            label={option}
            variant={'outlined'}
            onDelete={() => props.deleteOption(option)}
            color={'primary'}
            key={`search_${option}`}
          />
        ))
      }
    </Stack>
    <Grid container gap={2} alignItems={'center'} margin={'8px 0'}>
      <Grid item width={450}>
        <TextField
          inputRef={props.testRef}
          size={'small'}
          fullWidth
          sx={{background:"#fff",}}
          onKeyDown={handleKeyDown}
        />
      </Grid>
      <Grid item width={100}>
        <Button variant={'outlined'} color={'inherit'} fullWidth onClick={props.testClick} sx={{background:"#fff"}}>찾기</Button>
      </Grid>
    </Grid>
  </>
}
export default SearchComponent
