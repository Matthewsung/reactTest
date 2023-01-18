import {Badge, IconButton} from "@mui/material";
import {Notifications} from "@mui/icons-material";
import styled from "styled-components";

const CustomBadge = styled(Badge)`
  .MuiBadge-badge { 
    background: #ff00ff;
    //top: 12px;
    //right: 16px;
  } 
`
const BadgeComponent = () => {
  return <>
    <div>-Badge-</div>
    <IconButton>
      <CustomBadge color={'primary'} variant={'dot'} overlap={"circular"} invisible={false} >
        <Notifications fontSize={'large'}/>
      </CustomBadge>
    </IconButton>
  </>
}
export default BadgeComponent