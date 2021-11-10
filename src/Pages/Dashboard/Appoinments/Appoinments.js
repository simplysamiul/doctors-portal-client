import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Appoinments = ({date}) => {
    const {user, token} = useAuth();
    const [appoinments, setAppoinments] = useState([]);

    useEffect(()=>{
        const url = `http://localhost:5000/appoinments?email=${user.email}&date=${date}`;
        fetch(url,{
          headers : {
            "authorization" : `Bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(data => setAppoinments(data));
    },[date, user.email, token]);
    return (
        <div>
            <h1>Appoinments</h1>
            <TableContainer component={Paper}>
      <Table aria-label="Appoinments table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Time </TableCell>
            <TableCell align="right">Service </TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appoinments.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.patientName}
              </TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.serviceName}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    );
};

export default Appoinments;