import {
  Paper,
  List,
  ListItem,
  Grid,
  Button,
  Checkbox,
  ListItemIcon, ListItemText, Table, TableRow, TableCell, TableHead, TableBody
} from "@mui/material";
import {useEffect, useState, useMemo} from "react";
import styled from "styled-components";

type IList = {
  id: number
}
const CustomPaper = styled(Paper)`
  width: 200px;
  height: fit-content;
  min-height: 264px;

  .MuiListItem-root {
    background: ${props => props?.color || '#fff'};
    padding: 0;
    &:nth-child(even) {
      background: #ddd;
    }
  }
`
const TransferComponent = () => {
  const [leftItems, setLeftItems] = useState<IList[]>([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ])
  const [rightItems, setRightItems] = useState<IList[]>([])
  const [checkedList, setCheckedList] = useState<IList[]>([])

  // useEffect(() => {console.log(checkedList); console.log(leftItems); console.log(rightItems)} )

  const handleCheckList = (value:IList) => {
    let newList
    const confirmChecked = checkedList.filter(list => list.id === value.id)
    if(confirmChecked.length) {
      newList = checkedList.filter(checked => checked.id !== value.id)
    } else {
      newList = [...checkedList, value]
    }
    setCheckedList(newList);
  }
  const CustomList =(items: IList[]) => (
    <CustomPaper >
      <List>
        <ListItem >
          <ListItemIcon>
            <Checkbox sx={{display: 'none'}} />
            <ListItemText sx={{width: '42px', height: '30px', lineHeight:'42px', textAlign:'center'}}>#</ListItemText>
          </ListItemIcon>
          <ListItemText>업데이트</ListItemText>
        </ListItem>
        {items && items.map(item => {
          return <ListItem key={`items_${item.id}`} button onClick={() => handleCheckList(item)} >
            <ListItemIcon>
              <Checkbox checked={checkedList.filter(list => list?.id === item.id).length > 0 } />
            </ListItemIcon>
            <ListItemText>
              {item.id}
            </ListItemText>
          </ListItem>
        })}
      </List>
    </CustomPaper>
  )
  const handleListMove = (direction:string) => {
    let newList = []
    // if(direction === 'left') {
      newList = [...rightItems, ...checkedList]
      // const newLeftItems = leftItems.filter((left) => {
      //   const matchedItem = checkedList.filter(checked => checked.id === left.id)
      //   if(matchedItem.length === 0) {
      //     return left
      //   }
      // })

      setCheckedList([])
      // setLeftItems(newLeftItems)
      setRightItems(newList)
    // }

    // newList = [...leftItems, ...checkedList]
    // const newRightItems = rightItems.filter((right) => {
    //   const matchedItem = checkedList.filter(checked => checked.id === right.id)
    //   if(matchedItem.length === 0) {
    //     return right
    //   }
    // })
    // setCheckedList([])
    // setRightItems(newRightItems)
    // setLeftItems(newList)
  }

  const handleResetChecked = ( ) => {
    setRightItems([])
  }

  return <>
    <Grid container spacing={2} alignItems={'center'} width={512}>
      <Grid item >
        {CustomList(leftItems)}
      </Grid>
      <Grid item >
        <Grid container direction={'column'} gap={2}>
          <Button variant={'outlined'} onClick={() => handleListMove('left')}>
            {`>`}
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <CustomPaper >
          <List>
            {rightItems && rightItems.map(item => <ListItem>
              <ListItemIcon>
                <Checkbox sx={{display: 'none'}} />
              </ListItemIcon>
              <ListItemText>
                {item.id}
              </ListItemText>
            </ListItem>)}

          </List>
        </CustomPaper>
      </Grid>
    </Grid>
    <Grid container justifyContent={'right'} spacing={2} width={512} marginTop={0}>
      <Grid item >
        <Button variant={'outlined'} onClick={handleResetChecked}>전체삭제</Button>
      </Grid>
    </Grid>
  </>
}
export default TransferComponent