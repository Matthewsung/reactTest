import React, {ChangeEvent, SyntheticEvent, useState} from "react";

import {Tab, Tabs, TabsProps} from "@mui/material";

const TabComponent = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [tabVal, setTabVal] = useState(
    [
      {id: 1, txt: '1번 탭'},
      {id: 2, txt: '2번 탭'},
      {id: 3, txt: '3번 탭'},
    ]
  )

  const handleChangeTabs = (event:SyntheticEvent, clickedTab:number) => {
    setTabIndex(clickedTab)
  }
  return <>
    <div>-Tab</div>
    <Tabs value={tabIndex}  onChange={handleChangeTabs}>
      {
        tabVal.map(tab => <Tab
          label={tab.txt}
          id={`tab_${tab.id}`}
          aria-controls={`tabContent_${tab.id}`}
          key={`tab_${tab.id}`}
        />)
      }
    </Tabs>
    {
      tabVal.map((tab, idx) => <TabPanel
        hidden={tabIndex !== idx}
        contents={tab.txt}
        id={`tabContent_${tab.id}`}
        key={`tabPan_${tab.id}`}

      /> )
    }
  </>
}
export default TabComponent

const TabPanel:React.FC<{contents: string, id: string, hidden: boolean}> = (props) => {

  return <div {...props} >
    {props.contents} 번 탭
  </div>
}