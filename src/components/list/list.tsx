import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TablePagination,
  TableCellProps,
  TablePaginationBaseProps
} from '@mui/material'
import React, {useEffect, useMemo, useState} from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getStoreData, reduxBranchesType } from '@/store/listSlice'
import CompareChartComponents from "@/components/list/CompareChart";


const ListComponent = () => {
  const dispatch = useAppDispatch()
  const { branches } = useAppSelector((store) => store?.list)
  const [selectedStore, setSelectedStore] = useState<reduxBranchesType[]>([])
  const [pagination, setPagination] = useState(0)
  const [perPage, setPerPage] = useState(5)

  useMemo(() => dispatch(getStoreData()), [dispatch]);

  const store = useMemo(() => {
    const stores = [...branches]
    return stores.slice(pagination * perPage, (pagination + 1) * perPage)
  }, [pagination, branches, perPage]);

  const handleClickAll = (event: React.MouseEvent ) => {
    const target = event.target as HTMLInputElement
    if(!target.checked) {
      return setSelectedStore([])
    }
   setSelectedStore([...store])
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
  const handlePageMove = (event: unknown, newPage:number) => {
    setPagination(newPage)
  }
  const handleChangePerPage = (event: React.ChangeEvent<HTMLInputElement>, ) => {
    setPerPage(parseInt(event.target.value,10))
    setPagination(0)
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{width:'10%'}}>
                <Checkbox onClick={event => handleClickAll(event)}/>
              </StyledTableCell>
              <StyledTableCell sx={{width: '10%'}}>
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
            { store.length > 0 &&
              store.map(branch =>
              <TableRow
                key={`tableRow_${branch.id}`}
                onClick={event => handleClickCell(event, branch)}
              >
                <StyledTableCell >
                  <Checkbox checked={ !!selectedStore.filter(store => store.id === branch.id).length }/>
                </StyledTableCell>
                <StyledTableCell>
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
      <TablePagination
        component={'div'}
        count={ branches.length } //page 개수
        onPageChange={handlePageMove}
        onRowsPerPageChange={handleChangePerPage}
        page={pagination} //보여줄 현재 페이지
        rowsPerPage={perPage} //페이지당 보여줄 리스트 개수
        rowsPerPageOptions={[ 5, 10 ]} // 페이지당 보여줄 리스트 조건
        labelDisplayedRows={({ page}) => page + 1 }
        labelRowsPerPage={''}
      />
      {selectedStore.length > 0 && <CompareChartComponents chartData={selectedStore}/>}
    </>
  )
}
export default ListComponent

const StyledTableCell:React.FC<TableCellProps> = (props) => {
  return <TableCell align={'center'} padding={'none'} sx={{...props.sx}} >
    {props.children}
  </TableCell>
}