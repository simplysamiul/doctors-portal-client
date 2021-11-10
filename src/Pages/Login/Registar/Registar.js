import { Container, Grid, TextField, Typography, Button, CircularProgress, Alert } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import login from '../../../images/login.png';


const Registar = () => {
    const [loginData, setLoginData] = useState({});
    const history = useHistory();
    const {registarUser, isLoading, authError, user} = useAuth();
   

    // From submit 
    const handelOnChange = event =>{
        const field = event.target.name;
        const value = event.target.value;
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        setLoginData(newLoginData);
        
    };
    const handelLoginSubmit = event =>{
        if(loginData.password !== loginData.password2){
            alert("Your password didn't match ");
            return
        }
        registarUser(loginData.email, loginData.password, loginData.name, history);
        event.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid sx={{mt:10}} item xs={8}>
                <Typography variant="body1" gutterBottom>
                    Register
                </Typography>
                { !isLoading && <form onSubmit={handelLoginSubmit}>
                <TextField
                sx={{width : "75%", m: 1}} 
                id="standard-basic" 
                label="Your name"
                name="name"
                type="text"
                onBlur={handelOnChange} 
                variant="standard" />

                <TextField
                sx={{width : "75%", m: 1}} 
                id="standard-basic" 
                label="Your Email"
                name="email"
                type="email"
                onBlur={handelOnChange} 
                variant="standard" />

                <TextField
                sx={{width : "75%", m: 1}} 
                id="standard-basic" 
                label="password"
                type="password"
                name="password"
                onBlur={handelOnChange} 
                variant="standard" />

                <TextField
                sx={{width : "75%", m: 1}} 
                id="standard-basic" 
                label="Re-type your password"
                type="password"
                name="password2"
                onBlur={handelOnChange} 
                variant="standard" />
                <Button sx={{width : "75%", m: 1}} type="submit" variant="contained">Sign-Up</Button>
                <NavLink to="/login">
                    <Button variant="text">Already Resistred?--Please Log-In</Button>
                </NavLink>
                </form>}
                {
                    isLoading && <CircularProgress />
                }
                {
                    user?.email && <Alert severity="success">User Create Successfully!</Alert>
                }
                {
                    authError && <Alert severity="error">{authError}</Alert>
                }
                </Grid>
                <Grid item xs={4}>
                    <img style={{width: '100%'}} src={login} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Registar;