import { Outlet, useLocation } from "react-router-dom";
import HeaderComponent from "@/components/common/Header";
import {Container} from "@mui/material";

import {useAppDispatch} from "@/store";
import {useEffect} from "react";
import { saveToken } from "@/store/loginSlice";

const InitPage = () => {
  const params = useLocation().pathname.slice(1)

  return <>
    <HeaderComponent />
    <Container maxWidth="md" >
      <h1>
        {params || 'Main'} page
      </h1>
      <Outlet />
    </Container>
  </>
}

export default InitPage