import {Breadcrumbs} from "@mui/material";
import {NavLink, useLocation} from "react-router-dom";
import styled from "styled-components";
const CustomBreadcrumbs = styled(Breadcrumbs)`
  .MuiBreadcrumbs-li {
    &:last-child {
      color: red;
    }  
  } 
`
const LocationComponent = () => {
  const location = useLocation();
  const urlPath =  location.pathname.split('/')

  return  <>
    <div>-location Nav-</div>
    <CustomBreadcrumbs separator={' > '} >
      {urlPath.map((url, idx) => {
        if(!idx) return
        const test = urlPath
          .filter((value, idx2)=> idx2 <= idx  )
          .reduce((prev, cur) => `${prev}/${cur}`)

        return <NavLink to={test} key={`link_${url}_${idx}`}>{url}</NavLink>
      })}
    </CustomBreadcrumbs>
  </>
}

export default LocationComponent