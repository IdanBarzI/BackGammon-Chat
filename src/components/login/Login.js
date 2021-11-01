import React, { useState} from 'react'
import './Login.css'
import { Container, Divider, Stack, TextField,Button } from '@mui/material'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
    userName:yup.string().required("* User Name is requierd"),
    password: yup.string().required("* Password is requierd").min(5,"* Password must be at least 5 characters")
});

const Login = () => {
    const [userName , setUserName ] = useState("")
    const [password , setPassword ] = useState("")
    const [isLoggedin , setIsLoggedIn ] = useState(false)
    const [user,setUser] = useState({})
    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver:yupResolver(schema)
    })


    const sendDetails = () =>{
        axios.post('http://localhost:8082/api/auth/login',{
            UserName: userName,
            Password: password
        }).then((res)=>{
            if(!res.data.errors){
                localStorage.setItem("key",res.data.key)
                setUser(res.data.user)
                setIsLoggedIn(true);
            }
            else{
                alert(errors)
            }
        }).catch((err)=>{
            console.log(err)
        })
        
    }



    if (!isLoggedin) {
        return (
            <div className="Login">
               <Container maxWidth="sm" fixed="true" className="container">
               <form onSubmit={handleSubmit(sendDetails)}>
                    <Stack 
                        spacing={2}
                        divider={<Divider orientation="horizontal" flexItem />}>
                            <TextField 
                                name='userName'
                                className="field" 
                                id="outlined-basic" 
                                label="User Name" 
                                variant='filled'
                                {...register('userName')} 
                                onChange={(e)=>{setUserName(e.target.value)}}/>
                            <p>{errors['userName']?.message}</p>
                            <TextField 
                                name='password'
                                className="field" 
                                id="outlined-basic" 
                                type='password'  
                                label="Password" 
                                variant="filled"
                                {...register('password')}
                                onChange={(e)=>{setPassword(e.target.value)}}/>
                            <p>{errors['password']?.message}</p>
                            <Button className='login-btn'  variant='outlined' type='submit'>Login</Button>
                            <Link className="signup-link" to="/signup">Dont have account ? click here to sign-up</Link>
                    </Stack>
               </form>
               </Container>
            </div>
        )
    }
    else{
        return (<Redirect
            to={{
            pathname: "/chat",
            state: { user: user }
          }}
        />)
    }
}

export default Login
