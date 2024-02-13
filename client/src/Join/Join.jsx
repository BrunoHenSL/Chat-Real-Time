/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useRef} from 'react'
import io from 'socket.io-client'
import style from './Join.module.css'
import {Input, Button} from '@mui/material'

export default function Join({setChatVisibility, setSocket}) {

  const usernameRef = useRef()

  const handleSubmit = async () => {
    const username = usernameRef.current.value
    if(!username.trim()) return
    const socket = await io.connect('http://localhost:3001')
    socket.emit('set_username', username)
    setSocket(socket)
    setChatVisibility(true)
  }

  const getEnterKey = (e) =>{
    if(e.key === 'Enter')
      handleSubmit()
  }

  return (
    <div className={style['join-container']}>
      <h2>CHAT EM TEMPO REAL</h2>
      <Input inputRef={usernameRef} placeholder='Nome de usuário' onKeyDown={(e)=>getEnterKey(e)} />
      <Button sx={{mt:2}} onClick={()=>handleSubmit()} variant="contained">Entrar</Button>
    </div>
  )
}