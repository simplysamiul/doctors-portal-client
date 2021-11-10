import { Container, Grid, TextField, Typography, Button, CircularProgress, Alert } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import login from '../../../images/login.png';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const {user, isLoading, loginUser, authError, signInWithGoogle} = useAuth();

    const location = useLocation();
    const history = useHistory();
   

    // From submit 
    const handelOnChange = event =>{
        const field = event.target.name;
        const value = event.target.value;   
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        setLoginData(newLoginData);
        
    };
    const handelLoginSubmit = event =>{
        loginUser(loginData.email, loginData.password, location, history);
        event.preventDefault();
    }
    // Google Sign In 
    const handelGoogleSignIn =() =>{
        signInWithGoogle(location, history);
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid sx={{mt:10}} item xs={8}>
                <Typography variant="body1" gutterBottom>
                    Log-In
                </Typography>
                <form onSubmit={handelLoginSubmit}>
                <TextField
                sx={{width : "75%", m: 1}} 
                id="standard-basic" 
                label="Your Email"
                name="email"
                type="email"
                onChange={handelOnChange} 
                variant="standard" />

                <TextField
                sx={{width : "75%", m: 1}} 
                id="standard-basic" 
                label="password"
                type="password"
                name="password"
                onChange={handelOnChange} 
                variant="standard" />
                <Button sx={{width : "75%", m: 1}} type="submit" variant="contained">Log-In</Button>
                <NavLink to="/register">
                    <Button variant="text">new user?--Please Register</Button>
                </NavLink>
                </form>
                <p>------------- OR -------------</p>
                <Button onClick={handelGoogleSignIn} variant="contained">Google Sign In</Button>
                {
                    isLoading && <CircularProgress />
                }
                {
                    user?.email && <Alert severity="success">Login Successfully!</Alert>
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

export default Login;