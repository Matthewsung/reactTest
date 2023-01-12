import React, {useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {List, ListItem, Container, Grid} from "@mui/material";
import styled from "styled-components";
type IList = {
  id:number,
  text: string
}
type IBox = {
  id: string
}
const DragdropComponent = () => {
  const boxList:IBox[] = [
    {id:'listItem'},
    {id:'resultItem'},
    {id:'otherItem'},
  ]
  const [lists, setLists] = useState<{
    listItem: IList[] ,
    resultItem: IList[] ,
    otherItem: [],
  }>({
    listItem: [
      {id: 1, text: 'wait'},
      {id: 2, text: 'shake'},
      {id: 3, text: 'wait'},
      {id: 4, text: 'shake'},
      {id: 5, text: 'output'},
    ],
    resultItem: [],
    otherItem: [],
  })
useEffect(() => {console.log(lists)})

  const handleDragEnd = (result:any) => {
    console.log(result)
    const { destination, source, draggableId } = result
    if(!destination) { return }

    let newList = [...lists[source.droppableId]]
    let targetDestination = [...lists[destination.droppableId]]
    const targetList = lists.listItem[source.index]


    if(destination.droppableId === source.droppableId) {
      newList.splice(source.index,1)
      newList.splice(destination.index,0,targetList)
      setLists({...lists, ['listItem'] : newList })
    } else {
      let test = {
        [source.droppableId]: newList,
        [destination.droppableId] : targetDestination
      }
      targetDestination.push(targetList)
      setLists({...lists ,...test})
    }
  }

  return (
    <div>
      <h1>drag & drop</h1>
      <Grid container spacing={2} gap={2}>
          <DragDropContext onDragEnd={ handleDragEnd }>
            {
              boxList.map((box, idx) => (
                <Grid item key={`${box.id}_${idx}`} >
                  <div>{box.id}</div>
                  <Droppable droppableId={box.id}  >
                    {(provided,snapshot) => (
                      <CustomBox
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                      >
                        {
                          lists[box.id].map((list, idx1) => (
                            <Draggable
                              draggableId={`draggableItem_${list.id}`}
                              index={idx1}
                              key={`${box.id}_${list.id}`}
                            >
                              {(provided,snapshot) => (
                                <CustomList
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                  isDragging={snapshot.isDragging}
                                >
                                  <CustomHandler {...provided.dragHandleProps} />
                                  <span>
                                {list.text}
                              </span>
                                </CustomList>
                              )}
                            </Draggable>
                          ))
                        }
                        {provided.placeholder}
                      </CustomBox>
                    )}
                  </Droppable>
                </Grid>
              ))
            }

          </DragDropContext>
      </Grid>
    </div>
  )
}
export default DragdropComponent

const CustomBox = styled.div`
  width: 250px;
  height: fit-content;
  min-height: 250px;
  border: 1px solid #ddd;
  padding: 8px;
  background: #fff;
`
const CustomList = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  padding: 8px;
  margin: 8px 0;
  text-align: center;
  background: ${props => props.isDragging? '#ff0078': '#ffff78'};
  display: flex;
  gap: 8px;
  align-items: center;
`
const CustomHandler = styled.div`
  width: 20px;
  height: 20px;
  background: #ff00ff;
`