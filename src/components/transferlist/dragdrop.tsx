import React, {
  ChangeEvent,
  SetStateAction,
  SyntheticEvent,
  useRef,
  useState
} from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import {
  List,
  ListItem,
  Grid,
  Button, ListItemText,
  Checkbox, FormControl, FormControlLabel,
} from "@mui/material";
import styled from "styled-components";

type IMenu = {
  id: number,
  name: string,
  check: boolean

}
type IBox = {
  title: string,
  items: never | IMenu[],
  check: boolean
}

const DragdropComponent = () => {
  const menuList = {
    title: '메뉴',
    items : [
      {id: 1, name: '롸버트 후라이드',check:false},
      {id: 2, name: '롸버트 양념',check:false},
      {id: 3, name: '(반반) 후라+양념',check:false},
      {id: 4, name: '치즈볼',check:false},
    ],
  }

  const [testColumns, setTestColumns] = useState<{[key:string]:IBox}>({
    box_1: {
      title: '가맹',
      items: [
        {id: 1, name: '롸버트 후라이드', check: false},
      ],
      check: false
    },
    box_2: {
      title: '지점',
      items: [
        {id: 2, name: '롸버트 양념', check: true},
      ],
      check:true
    }
  })
  const handleCopyGroup = () => {
    console.log('그룹 복제해서 더하기')
  }
  const handleAddGroup = () => {
    // const index = Object.keys(testColumns).length + 1
    // const getTitle = prompt('타이틀 입력')
    // const newTestColumn = {
    //   ...testColumns,
    //   [`box_${index}`]: {title: getTitle,items: [], check: false}} as {[key: string]: IBox
    // }
    //
    // setTestColumns(newTestColumn)
  }
  const handleRemoveGroup = () => {
    // console.log('그룹 빼기')
    // let newData = {...testColumns}
    // // let index = Object
    // //   .keys(newData)
    // //   .map((key, idx) => {
    // //     if(newData[key].check) {
    // //       return idx
    // //     }
    // //   })
    // //
    // // console.log(index)
    // console.log(newData)
    // const checkedIndex = Object.values(newData).findIndex(value => value.check)
    // console.log(checkedIndex)
    // console.log(newData[0])
  }

  const handleDragEnd = (value: DropResult) => {
    if(!value.destination) return ;
    const { source, destination } = value
    const targetBox = destination?.droppableId
    const targetData = testColumns[targetBox]
    // menuList 내에서 이동시 불가
    if(source.droppableId === destination?.droppableId && source.droppableId === 'menuList') {
      return alert('불가')
    }
    // 아이템 빼기
    else if(destination?.droppableId === 'menuList') {
      testColumns[source.droppableId].items.splice(source.index,1)

      return alert('빼기 성공')
    }
    // 각자의 box에서는 이동 불가
    else if(source.droppableId === destination?.droppableId) {
      return alert('같은 리스트입니다')
    }
    else if(source.droppableId !== 'menuList' ) {
      return alert('각각의 box끼리는 이동이 불가')
    }
    const checkData = targetData.items.filter((item: IMenu) => item.id === menuList.items[source.index].id)

    if(!checkData.length) {
      targetData.items.push(menuList.items[source.index])
      // 순서 정렬
      targetData.items.sort((prev, cur) =>  prev.id - cur.id)
      setTestColumns({...testColumns, [targetBox]: targetData})
    }
  }

  const handleCheckBox = (event:SyntheticEvent, checked:boolean, idx1:number, idx2:number | boolean) => {
    const { value } = event.target as HTMLInputElement
    let newData = {...testColumns}
    let checkCount = 0

    if(typeof idx2 === "boolean") {
      newData[value].check = checked
      newData[value].items.map((item, index) => {
        if(checked){
          item.check = true
        }
        else {
          item.check = false
        }
        return item
      })
    }
    else {
      newData[value].items.map((item, index) => {
        if(index === idx2) {
          item.check = checked
        }
        item.check? checkCount++ : checkCount
        !checkCount ? newData[value].check = false : newData[value].check = true
        return item
      })
    }
    setTestColumns(newData)
  }

  return <>
    <DragDropContext onDragEnd={handleDragEnd} >
      <Grid container gap={2} marginTop={3} alignItems={'center'}>
        <CustomBox item>
          <List disablePadding>
            <ListItem>
              <ListItemText>#</ListItemText>
              <ListItemText sx={{flex: '3 1 auto'}}>
                { menuList.title }
              </ListItemText>
            </ListItem>
          </List>
          <Droppable droppableId={'menuList'} >
            {
              (provided, snapshot) => (
                <List
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {
                    menuList.items.map((menu, index) => (
                      <Draggable
                        draggableId={`menuList_${menu.id}`}
                        index={index}
                        key={`menuList_${menu.name}`}
                      >
                        {
                          (provided, snapshot) => (
                            <ListItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{
                                padding: '4px 8px',
                                margin: '4px 0',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                background: '#f1eddc'
                              }}
                            >
                              <ListItemText>{menu.id}</ListItemText>
                              <ListItemText sx={{flex: '3 1 auto'}}>{menu.name}</ListItemText>
                            </ListItem>
                          )
                        }
                      </Draggable>
                    ))
                  }
                  {provided.placeholder}
                </List>
              )
            }
          </Droppable>
        </CustomBox>
        <CustomBox item >
          <div style={{textAlign: 'right', marginBottom: '8px'}}>
            <Button variant={'outlined'} onClick={handleCopyGroup}>그룹복제</Button>
          </div>
          <Grid
            container
            direction={'column'}
          >
            {
              Object.entries(testColumns).map(([itemKey, itemValue], idx1) => (
                <Grid item key={itemKey}  sx={{background: '#efe4c8', border: '1px solid #fff', padding: '8px 20px', margin: '4px 0'}}>
                  <Droppable droppableId={itemKey}>
                    {
                      (provided,snapshot) => (
                        <Grid ref={provided.innerRef} {...provided.droppableProps}>
                          <FormControl>
                            <FormControlLabel
                              control={ <Checkbox/> }
                              label={itemValue.title}
                              checked={itemValue.check}
                              value={itemKey || ""}
                              onChange={(event, checked) => handleCheckBox(event, checked, idx1, false)}
                            />
                          </FormControl>
                          <List>
                            {
                              itemValue.items.map((value, idx2)=> (
                                <Draggable
                                  draggableId={`${value.name}_${idx1}`}
                                  index={idx2}
                                  key={`itemKey_${itemValue.title}_${idx2}`}>
                                  {
                                    (provided, snapshot) => (
                                      <ListItem
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                       <FormControl>
                                         <FormControlLabel
                                           control={<Checkbox />}
                                           label={value.name}
                                           checked={value.check}
                                           value={itemKey || ""}
                                           onChange={(event:SyntheticEvent, checked) => handleCheckBox(event, checked, idx1, idx2)}
                                         />
                                       </FormControl>
                                      </ListItem>

                                    )
                                  }
                                </Draggable>
                              ))
                            }
                          </List>
                          {provided.placeholder}
                        </Grid>
                      )
                    }
                  </Droppable>
                </Grid>
              ))
            }
          </Grid>
          <Grid container gap={1} justifyContent={'flex-end'} marginTop={1}>
            <Grid item>
              <Button variant={'outlined'} onClick={handleAddGroup}>+</Button>
            </Grid>
            <Grid item>
              <Button variant={'outlined'} type={'submit'} onClick={handleRemoveGroup}>-</Button>
            </Grid>
          </Grid>
        </CustomBox>
      </Grid>
    </DragDropContext>
  </>
}
export default DragdropComponent
const CustomBox = styled(Grid)`
  width: 300px;
  min-height: 300px;
  padding: 8px;
  background: #e1e1e1;
  border-radius: 12px;
`