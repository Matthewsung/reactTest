import { Outlet, useLocation } from "react-router-dom";
import HeaderComponent from "@/components/common/Header";
import {Container} from "@mui/material";
import MenuComponent from "@/components/common/MenuComponent";
import styled from "styled-components";
const InitPage = () => {
  const params = useLocation().pathname.slice(1)

  return <>
    <CustomContainer maxWidth="lg" >
      <CustomSide>
        <HeaderComponent />
      </CustomSide>
      <CustomMain>
        <h1>
          {params || 'Main'} page
        </h1>
        <Outlet />
      </CustomMain>
    </CustomContainer>
  </>
}

export default InitPage

const CustomContainer = styled(Container) `
  padding: 8px 12px;
  display: flex !important;
  gap: 8px;
`
const CustomSide = styled.div`
  flex: 1 0 20%;
  padding: 24px 12px;
  border: 1px solid #ddd;
`
const CustomMain = styled.div`
  flex: 6 0 80%;
  border: 1px solid #ddd;
`