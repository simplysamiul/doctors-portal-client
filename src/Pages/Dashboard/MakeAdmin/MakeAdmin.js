import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';
import useAuth from '../../../hooks/useAuth';



const MakeAdmin = () => {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const { token } = useAuth();
    const handelOnBlur = e =>{
        setEmail(e.target.value);   
    };
    const handelAdminSubmit = e =>{
        const user = {email}
        fetch("http://localhost:5000/users/admin", {
            method : "PUT",
            headers : {
                "authorization" : `Bearer ${token}`,
                "content-type" : "application/json"
            },
            body : JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                setSuccess(true);
            }
        });
        e.preventDefault();
    }
    return (
        <div>
            <h1>Make An Admin</h1>
           <form onSubmit={handelAdminSubmit}>
           <TextField sx={{width: "50%"}} label="email" type="email" onBlur={handelOnBlur} variant="standard" />
           <Button type="submit" variant="contained">Make Admin</Button>

            {
                success && <Alert severity="success">Make Admin Successfully!</Alert>
            }

           </form>
        </div>
    );
};

export default MakeAdmin;