import { Box, Button, Card, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { saveToken } from '@/store/loginSlice'
import {useAppDispatch} from "@/store";

type UserType = {
  id:string,
  pw:string
}
const JWTComponent = () => {
  const dispatch = useAppDispatch()
  // const dispatch = useDispatch()
  const IdRef = useRef<HTMLInputElement>(null);
  const PwRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<boolean>(false)
  const [failLogin, setFailLogin] = useState<string | boolean>()
  const [users, setUsers] = useState<UserType[]>([])

  const [token, setToken] = useState<string>(localStorage.getItem('token') || '')

  const handleLogin = async () => {
    const body = {id: IdRef.current?.value, pw: PwRef.current?.value}
    const { data } = await axios({
      url: 'http://localhost:4567/login',
      method: 'POST',
      data: body,
    })

    if(data.success) {
      dispatch(saveToken(data.data.refresh))
      localStorage.setItem('token', data.data.access)
      localStorage.setItem('refresh', data.data.refresh)
      setToken(data.data.access)
      setFailLogin(false)
      return setUser(data.data.id)
    }

    setFailLogin(data.data)
  }

  const handleLogout = () => {
    // dispatch(saveToken(''))
    // sessionStorage.removeItem('token')
    setUsers([])
    setUser(false)
  }
  const handleGetUsers = async () => {

    const { data } = await axios({
      url: 'http://localhost:4567/user',
      method:'GET',
      headers: {
        'authorization': token,
      },
      params:{
        refresh: localStorage.getItem('refresh')
      }
    })
    if(data.success) {
      setUsers(data.data)
    }
    else {
      alert(data.data)
    }
  }




  return <>
    <LoginCard
      user={user}
      handleGetUsers={handleGetUsers}
      handleLogout={handleLogout}
      users={users}
      id={IdRef}
      pw={PwRef}
      handleLogin={handleLogin}
    />
    { failLogin && <h1>{failLogin}</h1> }
  </>
}

export default JWTComponent

const LoginCard:React.FC<{
  user: boolean | string,
  handleGetUsers: () => void,
  handleLogout: () => void,
  handleLogin: () => void,
  users: UserType[],
  id: React.RefObject<HTMLInputElement>,
  pw: React.RefObject<HTMLInputElement>
}> = ({user, handleGetUsers, handleLogout, users, id, pw, handleLogin}) => {
  if(user) {
    return <>
      <h1 style={{textAlign:'center'}}>{`환영합니다 ${user}님`}</h1>
      <Box component='div' sx={{display: 'flex', justifyContent:'space-between'}}>
        <Button variant='contained' onClick={handleGetUsers}>유저 가져오기</Button>
        <Button variant='contained' onClick={handleLogout}>로그아웃</Button>
      </Box>
      <UserCard users={users}/>
    </>
  }

  return (
    <Box component='div' sx={{width: '500px',margin:'0 auto', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'8px', border: '1px solid #ccc', padding:'16px'}}>
      <TextField inputRef={id} placeholder='ID를 입력해주세요' fullWidth />
      <TextField type='password' inputRef={pw} placeholder='PW를 입력해주세요' fullWidth />
      <Button variant='outlined' onClick={handleLogin} fullWidth>
        로그인
      </Button>
    </Box>
  )
}

const UserCard: React.FC<{users: UserType[]}> = ({users}) => {
  if(!users.length ) {return null;}

  return <div style={{ display: 'flex', gap: '8px' }}>
    {
      users.map((user, idx) => <Card
        key={`user_${idx}`}
        sx={{ padding:'16px', margin: '12px 0'}}
      >
        <Typography variant='h5' component='div'>
          {`유저 ID : ${user.id}`}
        </Typography>
      </Card>)
    }
  </div>
}