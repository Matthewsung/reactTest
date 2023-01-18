import ComboBoxComponent from "@/components/custom/ComboBox";
import {ChangeEvent, MutableRefObject, SyntheticEvent, useRef} from "react";
import Searchbar from "@/components/custom/Searchbar";
import DateComboBox from "@/components/custom/DateComboBox";
import List from "@/components/custom/List";
import PieChartComponent from "@/components/custom/PieChartComponent";

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
  //////////////////////////////////////////////////////////////
  return <div>
    <ComboBoxComponent options={autoCompleteOptions} handleChange={handleSelectedCombo}/>
    <Searchbar innerRef={searchRef} handleSearch={handleSearch}/>
    <DateComboBox />
    <PieChartComponent data={tableOption} />
    <List data={tableOption}/>
  </div>
}
export default BranchPage