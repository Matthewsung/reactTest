import ComboBoxComponent from "@/components/custom/ComboBox";
import {ChangeEvent, MutableRefObject, SyntheticEvent, useRef} from "react";
import Searchbar from "@/components/custom/Searchbar";
import DateComboBox from "@/components/custom/DateComboBox";
import List from "@/components/custom/List";
import PieChartComponent from "@/components/custom/PieChartComponent";
import styled from "styled-components";
import {Button} from "@mui/material";
import LineChartComponent from "@/components/custom/LineChartComponent";
import FileUpload from "@/components/custom/FileUpload";

type IAutoCompleteOption = {
  id: number,
  value: string
}
const BranchPage = () => {
  // combobox///////////////////////////////////////////////////
  const autoCompleteOptions: IAutoCompleteOption[] | undefined = [
    {id: 1, value: 'item_1'},
    {id: 2, value: 'item_2'},
    {id: 3, value: 'item_3'},
    {id: 4, value: 'item_4'},
    {id: 5, value: 'item_5'},
    {id: 6, value: 'item_6'},
  ]
  const handleSelectedCombo = (event:SyntheticEvent<Element, Event>, newVal:IAutoCompleteOption) => {
    console.log( newVal)
  }
  //////////////////////////////////////////////////////////////
  // search bar ////////////////////////////////////////////////
  const searchRef= useRef() as MutableRefObject<HTMLInputElement>;
  const handleSearch = () => {
    console.log(searchRef.current.value)
    searchRef.current.value = ''
  }
  //////////////////////////////////////////////////////////////
  // list /////////////////////////////////////////////////////
  const tableOption = {
    header:[
      {id: 1, text:'#'},
      {id: 2, text:'매장'},
      {id: 3, text:'매출(원)'},
      {id: 4, text:'건수'},
    ],
    body: [
      {id:1, store: '1호기', price:23, count: 1, },
      {id:2, store: '2호기', price:27, count: 5, },
      {id:3, store: '3호기', price:49, count: 11, },
      {id:4, store: '6호기', price:11, count: 20, },
      {id:5, store: '튀김기', price:6, count: 1, },
    ]
  }
  const tableOption_2 = {
    header:[
      {id: 1, text:'#'},
      {id: 2, text:'플랫폼'},
      {id: 3, text:'매출(원)'},
      {id: 4, text:'건수'},
    ],
    body: [
      {id:1, store: '배민', price:23, count: 1, },
      {id:2, store: '쿠팡', price:27, count: 5, },
      {id:3, store: '요기요', price:49, count: 11, },
      {id:4, store: '저기요', price:11, count: 20, },
      {id:5, store: '이봐요', price:6, count: 1, },
    ]
  }
  const tableOption_3 = {
    header:[
      {id: 1, text:'#'},
      {id: 2, text:'매장명'},
      {id: 3, text:'날짜'},
      {id: 4, text:'매출'},
      {id: 5, text:'건수'},
    ],
    body: [
      {id:1, store: '1호기',date: '2021.01.17. 16:00', price:1000, count: 1, },
      {id:2, store: '1호기',date: '2021.01.17. 17:00', price:800, count: 2, },
      {id:3, store: '1호기',date: '2021.01.17. 18:00', price:1200, count: 6, },
      {id:4, store: '1호기',date: '2021.01.17. 19:00', price:1500, count: 10, },
      {id:5, store: '1호기',date: '2021.01.17. 20:00', price:1000, count: 11, },
      {id:6, store: '1호기',date: '2021.01.17. 21:00', price:900, count: 11, },
      {id:7, store: '1호기',date: '2021.01.17. 22:00', price:500, count: 11, },
      {id:8, store: '1호기',date: '2021.01.17. 23:00', price:200, count: 11, },

    ]
  }
  //////////////////////////////////////////////////////////////
  // file upload ///////////////////////////////////////////////
  const uploadRef = useRef<HTMLInputElement> (null)
  //////////////////////////////////////////////////////////////
  return <div style={{padding: '0 0 32px '}}>
    <ComboBoxComponent options={autoCompleteOptions} handleChange={handleSelectedCombo}/>
    <Searchbar innerRef={searchRef} handleSearch={handleSearch}/>
    <DateComboBox />
    <ListBox>
      <div className={'listbox'}>
        <PieChartComponent data={tableOption} />
        <List data={tableOption}/>
      </div>
      <div className={'listbox'}>
        <PieChartComponent data={tableOption_2} />
        <List data={tableOption_2}/>
      </div>
    </ListBox>
    <div style={{margin: '16px 0'}}>
      <LineChartComponent data={tableOption_3} />
      <List data={tableOption_3} />
    </div>
    <FileUpload uploadRef={uploadRef}/>
  </div>
}
export default BranchPage

const ListBox = styled.div`
  margin: 16px 0;
  display: flex;
  gap: 16px;
  
  .listbox {
    flex: 1 0 0;
  }
`