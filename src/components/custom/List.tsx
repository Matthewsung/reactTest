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
const List:React.FC<{
  data: {
    header: ITableHead[],
    body: ITableOptions[]
  }
}> = (props) => {
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
  return <>
    <Table>
      <TableHead>
        <TableRow>
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
        </TableRow>
      </TableHead>
      <TableBody>
        {
          sortedTable
            .map(options => <TableRow key={options.id}>
             <TableCell>{options.id}</TableCell>
             <TableCell>{options.store}</TableCell>
             <TableCell>{options.price}</TableCell>
             <TableCell>{options.count}</TableCell>
           </TableRow>)
        }
      </TableBody>
    </Table>
  </>
}
export default List