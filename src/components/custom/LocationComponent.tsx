import {Breadcrumbs} from "@mui/material";
import {NavLink, useLocation} from "react-router-dom";

const LocationComponent = () => {
  const location = useLocation();
  const urlPath =  location.pathname.split('/')

  return  <>
    <div>-location Nav-</div>
    <Breadcrumbs separator={' > '}>
      {urlPath.map((url, idx) => {
        if(!idx) return
        const test = urlPath
          .filter((value, idx2)=> idx2 <= idx  )
          .reduce((prev, cur) => `${prev}/${cur}`)

        console.log(test)
        return <NavLink to={test} key={`link_${url}_${idx}`}>{url}</NavLink>
      })}
    </Breadcrumbs>
  </>
}

export default LocationComponent