import {NavLink} from "react-router-dom";
import {Container,  Box, Button} from '@mui/material'

const HeaderComponent = () => {
  const menuName = [
    {path: '/', name: '기본'},
    {path: '/three', name: 'Three.js'},
    {path: '/chart', name: 'chart'},
    {path: '/jwt', name: 'JWT'},
    {path: '/seoul', name: 'Map'},
    {path: '/list', name: 'List'},
    {path: '/transfer', name: 'Transfer'},
    {path: '/custom', name: 'Custom'},
    {path: '/branch', name: 'Branch'},

  ]

  return (
    <>
      {
        menuName.map((menu, idx) => (
          <Box component='div' key={`menuName_${idx}`} sx={{marginBottom: '4px'}}>
            <Button variant="text" fullWidth sx={{justifyContent:"left"}}>
              <NavLink to={menu.path}>
                {menu.name}
              </NavLink>
            </Button>
          </Box>)
        )
      }
    </>

  )
}

export default HeaderComponent