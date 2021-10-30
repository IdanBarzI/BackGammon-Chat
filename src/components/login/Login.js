import React, { useState } from 'react'
import './Login.css'
import Button from '@mui/material/Button'
import { Container, Divider, Stack, TextField } from '@mui/material'
import axios from 'axios'

const Login = () => {
    const [userName , setUserName ] = useState("")
    const [password , setPassword ] = useState("")

    const sendDetails =()=>{
        axios.post('http://localhost:3495/api/auth/login',{
            UserName: userName,
            Password: password
        }).then((res)=>{
            localStorage.setItem("key",res.data.key)
        }).catch((err)=>{
            console.log(err)
        })

        
    }


    return (
        <div className="Login">
           <Container maxWidth="sm" fixed="true" className="container">
            <Stack 
                spacing={2}
                divider={<Divider orientation="horizontal" flexItem />}
                >
                    <TextField id="outlined-basic" label="User Name" variant="outlined" onChange={(e)=>{setUserName(e.target.value)}} />
                    <TextField id="outlined-basic" type='password'  label="Password" variant="outlined" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <Button color='primary' variant='outlined' onClick={sendDetails} >Login</Button>
            </Stack>
           </Container>
        </div>
    )
}

export default Login
