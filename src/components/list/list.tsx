import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TableCellProps
} from '@mui/material'
import React, { useMemo, useState} from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getStoreData, reduxBranchesType } from '@/store/listSlice'
import CompareChartComponents from "@/components/list/CompareChart";


const ListComponent = () => {
  const dispatch = useAppDispatch()
  const { branches } = useAppSelector((store) => store?.list)
  const [selectedStore, setSelectedStore] = useState<reduxBranchesType[]>([])

  useMemo(() => dispatch(getStoreData()), [dispatch]);

  const handleClickAll = (event: React.MouseEvent ) => {
    const target = event.target as HTMLInputElement
    if(!target.checked) {
      return setSelectedStore([])
    }
   setSelectedStore([...branches])
  }
  const handleClickCell = (event: React.MouseEvent, branch: reduxBranchesType) => {
    const target = event.target as HTMLInputElement
    const newStore = [...selectedStore]

    if(!target.checked) {
      const index = selectedStore.findIndex(store => store.id === branch.id)
      newStore.splice(index,1)

      return setSelectedStore(newStore)
    }

    setSelectedStore([...newStore, branch ])
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell >
                <Checkbox onClick={event => handleClickAll(event)}/>
              </StyledTableCell>
              <StyledTableCell >
                ID
              </StyledTableCell>
              <StyledTableCell>
                지점명
              </StyledTableCell>
              <StyledTableCell>
                조리수
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { branches.length > 0 &&
              branches.map(branch =>
              <TableRow
                key={`tableRow_${branch.id}`}
                onClick={event => handleClickCell(event, branch)}
              >
                <StyledTableCell >
                  <Checkbox checked={selectedStore.filter(store => store.id === branch.id).length ? true : false }/>
                </StyledTableCell>
                <StyledTableCell >
                  {branch.id}
                </StyledTableCell>
                <StyledTableCell>
                  {branch.store}
                </StyledTableCell>
                <StyledTableCell>
                  {branch.value}
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedStore.length > 0 && <CompareChartComponents chartData={selectedStore}/>}
    </>
  )
}
export default ListComponent

const StyledTableCell:React.FC<TableCellProps> = (props) => {
  return <TableCell align={'center'} padding={'none'}  >
    {props.children}
  </TableCell>
}