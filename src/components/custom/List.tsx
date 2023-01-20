import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from "@mui/material";
import {useMemo, useState} from "react";
type ITableOptions = {
  id: number,
  store: string,
  price: number,
  count: number,
}
type ITableHead = {
  id: number,
  text: string
}
import {ArrowDropDown} from '@mui/icons-material';
import {useNavigate, useNavigation,} from "react-router-dom";
import styled, {css} from "styled-components";
const List:React.FC<{
  data: {
    header: ITableHead[],
    body: ITableOptions[]
  }
}> = (props) => {
  const navigate = useNavigate()
  // const navigation = useNavigation()
  const [sortKey, setSortKey] = useState({
    key:'id',
    sort: 'asc',
    keyIndex : 0
  })
  const sortedTable = useMemo(() => {
    return props.data.body.sort((prev, cur) => {
      let prevVal = prev[sortKey.key as keyof ITableOptions]
      let curVal = cur[sortKey.key as keyof ITableOptions]

      if(prevVal < curVal) {
        return sortKey.sort === 'asc' ? -1 : 1
      }else if (prevVal > curVal) {
        return sortKey.sort === 'asc' ? 1 : -1
      }

      return 0
    })
  }, [sortKey.sort])

  const handleSortData = (id:number) => {
    let key = Object.keys(props.data.body[0])[id - 1]
    let newSort = {
      key,
      sort: sortKey.sort === 'asc'? 'desc': 'asc',
      keyIndex: id - 1
    }
    setSortKey(newSort)
  }
  const handleClickTable = (options:ITableOptions) => {
    console.log(options)
    navigate(`?item=${options.store}`)
    // console.log(navigation.location)
  }
  return <>
    <Table>
      <TableHead>
        <CustomTableRow header={"true"}>
          { props.data.header.map((head, idx1) => (
            <TableCell key={`head_${head.id}`}>
              <TableSortLabel
                active={idx1 === sortKey.keyIndex}
                direction={sortKey.sort === 'asc'?"asc":"desc"}
                IconComponent={ArrowDropDown}
                onClick={() => handleSortData(head.id)}
              >
                {head.text}
              </TableSortLabel>
            </TableCell>
            )
          )}
        </CustomTableRow>
      </TableHead>
      <TableBody>
        {
          sortedTable.map((options,index)=> (
              <CustomTableRow key={`tableRow_${options.id}`} onClick={() => handleClickTable(options)}>
                {
                  Object.entries(options).map(([keys, value],index) => (
                    <TableCell key={`tableCell_${keys}_${options.id}`}>{value}</TableCell>
                  ))
                }
              </CustomTableRow>
          ))
        }
      </TableBody>
    </Table>
  </>
}
export default List

const CustomTableRow = styled(TableRow)<{header?: string}>`
  
  &:nth-child(even) {
    background: #f8ecd9;
  }

  &:hover {
    background: #ddd;
    cursor: pointer;
  }
  ${props => props.header === 'true' && css`
    border-top: 2px solid #000;
    border-bottom: 2px solid #000;
    
    &:hover {
      background: inherit;
    }
  `}
`