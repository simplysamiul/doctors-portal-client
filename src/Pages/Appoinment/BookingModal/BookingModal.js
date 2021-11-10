import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useAuth from '../../../hooks/useAuth';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const BookingModal = ({openBooking, handleBookingClose, booking, date, setBookingSuccess}) => {
 const {name, time} = booking;
 const {user} = useAuth();

 const initileInfo = {patientName:user.displayName, email: user.email, phone: ""}
 const [bookingInfo, setBookingInfo] = useState(initileInfo);
 const handelOnBlur = e =>{
  const field = e.target.name;
  const value = e.target.value;
  const newInfo = {...bookingInfo};
  newInfo[field] = value;
  setBookingInfo(newInfo);
 }

 const handelSubmitBooking = e => {
    //  Collect Data
    const appoinment = {
      ...bookingInfo,
      time,
      serviceName : name,
      date: date.toLocaleDateString()
    }
    // Send to the server
    fetch("http://localhost:5000/appoinments", {
      method : "POST",
      headers : {
        "content-type" : "application/json"
      },
      body :  JSON.stringify(appoinment)
    })
    .then(res => res.json())
    .then(data => {
      if(data.insertedId){
        setBookingSuccess(true);
        handleBookingClose();
      }
    })
    e.preventDefault();
 };
    return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openBooking}
        onClose={handleBookingClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openBooking}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {name}
            </Typography>
            <form onSubmit={handelSubmitBooking}>
                <TextField
                    disabled
                    sx={{width: "90%", m: 2}}
                    id="outlined-size-small"
                    defaultValue={time}
                    size="small"
                />
                <TextField
                    sx={{width: "90%", m: 2}}
                    id="outlined-size-small"
                    name="patientName"
                    onBlur={handelOnBlur}
                    defaultValue={user.displayName}
                    size="small"
                />
                <TextField
                    sx={{width: "90%", m: 2}}
                    id="outlined-size-small"
                    name="email"
                    onBlur={handelOnBlur}
                    defaultValue={user.email}
                    size="small"
                />
                <TextField
                    sx={{width: "90%", m: 2}}
                    id="outlined-size-small"
                    name="phone"
                    onBlur={handelOnBlur}
                    defaultValue="Phone"
                    size="small"
                />
                <TextField
                    disabled
                    sx={{width: "90%", m: 2}}
                    id="outlined-size-small"
                    defaultValue={date.toDateString()}
                    size="small"
                />
                <Button type="submit" variant="contained">Book</Button>
                <Button sx={{margin: "20px"}} onClick={handleBookingClose} variant="outlined" color="error">Close</Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    );
};

export default BookingModal;