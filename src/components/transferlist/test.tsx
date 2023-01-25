import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";
import styled from "styled-components";
import {Button, ButtonGroup, Checkbox, FormControlLabel} from "@mui/material";
import {useState} from "react";
type IMainBox = {
  id: number,
  text: string
}
type IMoveBox = {
  id: number,
  text: string,
  items: IMainBox[],
  checked: boolean
}
const TestComponent = () => {
  const mainBox = [
    {id: 1, text: 'text 1'},
    {id: 2, text: 'text 2'},
    {id: 3, text: 'text 3'},
    {id: 4, text: 'text 4'},
    {id: 5, text: 'text 5'},
    {id: 6, text: 'text 6'},
    {id: 7, text: 'text 7'},
    {id: 8, text: 'text 8'},
    {id: 9, text: 'text 9'},
    {id: 10, text: 'text 10'},
  ] as IMainBox[]
  const [moveBox, setMoveBox] = useState<IMoveBox[]>([
    {
      id:1,
      text: '박스 1',
      items: [
        {id: 1, text: 'text 1'},
      ],
      checked:false
    },
    {
      id:2,
      text: '박스 2',
      items: [
        {id: 8, text: 'text 8'},
        {id: 9, text: 'text 9'},
      ],
      checked:true
    },
  ])

  const handleDragEnd = (value:DropResult) => {
    let newMoveBox = [...moveBox]
    let target
    let boxIndex
    const {destination, source, draggableId} = value
    if(!destination) return ;
    if(draggableId.includes('mainBox')) {
      boxIndex = parseInt(destination?.droppableId.split('_')[1]) - 1
      target = mainBox[source.index]

      if(!checkDuplicate(newMoveBox [boxIndex], target)) return alert('오류: 중복이 있습니다.')
      newMoveBox[boxIndex].items.push(target)

       newMoveBox[boxIndex].items.sort((prev, cur) => prev.id > cur.id ? 1 : -1)
      return setMoveBox(newMoveBox)
    }

    boxIndex = parseInt( draggableId.split('_')[1] )
    target = newMoveBox[boxIndex].items[source.index]

    if(destination.droppableId === 'mainBox') {
      newMoveBox[boxIndex].items.splice(source.index,1)
      return setMoveBox(newMoveBox)
    }
  }

  const checkDuplicate = (box:IMoveBox, data:IMainBox) => {
    const { items } = box

    const check = items.filter(item => item.id === data.id).length;

    return  !check
  }
  const handleAddBox = () => {
    const inputText = prompt('박스 이름 입력')
    const checkDuplicate = moveBox.filter(value => value.text === inputText)
    if(checkDuplicate.length) return alert('중복된 이름이 있습니다.')

    const init = {
      id: moveBox.length + 1,
      text:`${inputText}`,
      items: [],
      checked: false
    }

    const newMoveBox = [...moveBox, init]
    setMoveBox(newMoveBox)
  }
  const handleDeleteBox = () => {
    let filteredBox = moveBox.filter(box => !box.checked)
    setMoveBox(filteredBox)
  }

  const handleDuplicate = () => {
    let newBox = moveBox.filter(box => box.checked)
    if(!newBox.length) return alert('한개의 박스를 선택')
    if(newBox.length > 1) return alert('하나만 선택해주세요')
    console.log(newBox)
    
  }

  const handleSetChecked = (checked:boolean, box:IMoveBox) => {
    const index = box.id - 1
    let newBox = [...moveBox]

    newBox[index].checked = checked
    setMoveBox(newBox)
  }
  return <TestWrapper>

    <DragDropContext onDragEnd={handleDragEnd}>
      <div>Drag & Drop TEST</div>
      <BodyBox>
        <div style={{width: '350px'}}>
          <TitleBox>
            기준 박스
          </TitleBox>
          <MainBox>
            <Droppable droppableId={'mainBox'}>
              {
                (provided, snapshot) => (
                    <div  {...provided.droppableProps} ref={provided.innerRef}>
                      <ItemBox className={'tableHeader'}>
                        <div className={'itemId'}>#</div>
                        <div className={'itemText'}>text 명</div>
                      </ItemBox>
                      {
                        mainBox.map((item, index) => (
                          <Draggable draggableId={`mainBox_${index}`} index={index} key={`mainBox_${item.id}`}>
                            {
                              (provided1, snapshot1) => (
                                <ItemBox {...provided1.draggableProps} {...provided1.dragHandleProps} ref={provided1.innerRef} isDragging={snapshot1.isDragging}>
                                  <div className={'itemId'}>{item.id}</div>
                                  <div className={'itemText'}>{item.text}</div>
                                </ItemBox>
                              )
                            }
                          </Draggable>
                        ))
                      }
                    {provided.placeholder}
                  </div>
                )
              }
            </Droppable>
          </MainBox>
        </div>
        <div>
          <Button variant={'outlined'} onClick={handleDuplicate}>복제</Button>
          {
            moveBox.map((box, index) => (
              <div key={`moveBox_${index}`} style={{width: '300px'}}>
                <TitleBox>
                  <FormControlLabel control={<Checkbox /> } label={`${box.text}`} checked={box.checked} onChange={(e, checked) => handleSetChecked(checked, box)}/>
                  {/*<Button variant={'outlined'} onClick={() => handleDeleteBox(index)} size={'small'}>*/}
                  {/*  박스 삭제*/}
                  {/*</Button>*/}
                </TitleBox>
                <Droppable droppableId={`box_${box.id}`}>
                  {
                    (provided, snapshot) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} style={{border: '1px solid ', margin: '8px 0', padding: '8px 16px'}}>
                        <MainBox>
                          {provided.placeholder}
                          {
                            box.items.map((item, idx) => (
                              <Draggable draggableId={`item_${index}_${idx}`} index={idx} key={`boxItem_${idx}`} >
                                {
                                  (provided1, snapshot1) => (
                                    <ItemBox {...provided1.draggableProps} {...provided1.dragHandleProps} ref={provided1.innerRef}>
                                      <FormControlLabel control={<Checkbox />} label={item.text} className={'itemText'}/>
                                    </ItemBox>
                                  )
                                }
                              </Draggable>
                            ) )
                          }
                        </MainBox>
                      </div>
                    )
                  }
                </Droppable>
              </div>
              ))
            }
          <ButtonGroup>
            <Button variant={'outlined'} onClick={handleAddBox}>+</Button>
            <Button variant={'outlined'} onClick={handleDeleteBox}>-</Button>
          </ButtonGroup>
        </div>

      </BodyBox>
    </DragDropContext>
  </TestWrapper>
}

export default TestComponent
const TestWrapper = styled.div`
  border: 3px solid #ddd;
  padding: 8px 16px;
`

const BodyBox = styled.div`
  display: flex;
  gap: 36px;
`
const TitleBox = styled.div`
  margin: 8px;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const MainBox = styled.div`
  
`

const ItemBox = styled.div<{isDragging?: boolean}>`
  border: 1px solid #ddd;
  border-radius: 12px;
  background: ${props => props.isDragging?'#d1f8f4':'#eefaba'};
  padding: 8px 16px;
  margin: 4px 0;
  display: flex;
  gap: 8px;

  &.tableHeader {
    border: none;
    border-radius: 0;
    background: inherit;
    border-top: 3px solid;
    border-bottom: 3px solid;
  }

  .itemId {
    flex: 1 0 10%;
  }

  .itemText {
    flex: 4 0 80%;
  }

`