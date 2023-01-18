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

  return(
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        gap: '8px',
        padding: '16px 0',
        borderBottom: '1px solid #ddd',
        flexWrap:'wrap'
      }}
    >
    { menuName.map((menu, idx) => (
      <Box component='div' key={`menuName_${idx}`}>
        <Button variant="outlined">
          <NavLink to={menu.path}>
            {menu.name}
          </NavLink>
        </Button>
      </Box>))
    }
    </Container>
  )
}

export default HeaderComponent