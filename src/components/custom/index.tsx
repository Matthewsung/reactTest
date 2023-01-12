import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState
} from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  Chip,
  Grid,
  Paper, SelectChangeEvent,
  Stack,
  TextField
} from "@mui/material";
import LocationComponent from "@/components/custom/LocationComponent";
import SearchComponent from "@/components/custom/SearchComponent";
import DatepickerComponent from "@/components/custom/datepicker";
import SelectComponent from "@/components/custom/SelectComponent";

type ISearchOption = string | undefined

const CustomPage = () => {
  // 검색기능
  const [searchOptions, setSearchOptions] = useState<ISearchOption[]>([]) ;
  const searchRef = useRef<HTMLInputElement | null>(null)
  const handleDeleteChip = (target:ISearchOption) => {
    let newOptions = [...searchOptions]
    const newOption = newOptions.filter(option => option !== target)

    setSearchOptions(newOption)
  }
  const testRef = useRef<HTMLInputElement | null>(null);
  const handleTestClick = () => {
    console.log(testRef.current?.value)
    const option = testRef.current?.value
    if(!option) {return alert('검색어를 입력해주세요')}
    const filter = searchOptions.filter(option => option === testRef.current?.value).length
    if(filter) {
      return alert('같은 조건이 있습니다.')
    }
    setSearchOptions([...searchOptions, option])
  }

  const handleClickSearchBtn = () => {
    console.log('click!' , searchRef.current?.value)
  }


  // 선택기능
  const selectOptions = [
    {value:'1_1', text:'1_1'},
    {value:'1_2', text:'1_2'},
    {value:'2_1', text:'2_1'},
    {value:'2_2', text:'2_2'},
  ]
  const handleChangeSelect = (event:SelectChangeEvent<HTMLSelectElement | string>) => {
    console.log(event.target?.value)
  }


  return <>
    <Paper sx={{padding: '12px 16px', marginBottom: '8px'}}>
      <LocationComponent />
    </Paper>
    <Paper sx={{padding: '12px 16px', marginBottom: '8px'}}>
      <SearchComponent
        innerRef={searchRef}
        clickSearch={handleClickSearchBtn}
        testRef={testRef}
        testClick={handleTestClick}
        searchOptions={searchOptions}
        deleteOption={handleDeleteChip}
      />
    </Paper>
    <Paper sx={{padding: '12px 16px', marginBottom: '8px'}}>
      <DatepickerComponent />
    </Paper>
    <Paper sx={{padding: '12px 16px', marginBottom: '8px'}}>
      <SelectComponent
        options={selectOptions}
        onChangeSelect={handleChangeSelect}
      />
    </Paper>
  </>
}
export default CustomPage