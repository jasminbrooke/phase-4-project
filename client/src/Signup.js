import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

const Signup = ({ handleLogin }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/signup', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            username: username,
            password: password,
            password_confirmation: passwordConfirmation
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.errors) {
            setErrors(data.errors)
        } else {
            handleLogin(data)
        }
    })
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
            onChange={(e) => setName(e.target.value)}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
        />
        <TextField
            onChange={(e) => setUsername(e.target.value)}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            size="small"
        />
        <TextField
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            size="small"
            type='password'
        />
        <TextField
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            id="outlined-basic"
            label="Password Confirmation"
            variant="outlined"
            size="small"
            type='password'
        />
        <Button type="submit">Signup</Button>
      </form>
      {errors.map((error, i) => <Typography key={i}>{ error }</Typography>)}
    </div>
  );
}

export default Signup;

