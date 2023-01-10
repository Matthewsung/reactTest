import React from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import {List, ListItem} from "@mui/material";

const DragItems:React.FC<{items:any}> = ({items}) => {
  console.log(items);
  return <List>

    {(items.length > 0 && items.map((item, idx) => <ListItem key={`itemlist_${idx}`}>{item.id}</ListItem>))}
  </List>
}
const DragdropComponent = () => {
  const listItem = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
  ]
  const handleDragEnd = () => {
    console.log('드레그 끝')
  }

  return <div>
    <h1>drag & drop</h1>
    {/*<DragDropContext onDragEnd={ handleDragEnd }>*/}
      <DragItems items={listItem}/>
    {/*</DragDropContext>*/}
  </div>
  {/*return 11*/}
}
export default DragdropComponent