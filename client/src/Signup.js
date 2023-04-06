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
            //  error={errors.productname}
            // helperText={errors.productname}
            onChange={(e) => setName(e.target.value)}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
        />
        <TextField
            //  error={errors.productname}
            // helperText={errors.productname}
            onChange={(e) => setUsername(e.target.value)}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            size="small"
        />
        <TextField
            //  error={errors.productname}
            // helperText={errors.productname}
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            size="small"
        />
        <TextField
            //  error={errors.productname}
            // helperText={errors.productname}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            id="outlined-basic"
            label="Password Confirmation"
            variant="outlined"
            size="small"
        />
        <Button type="submit">Signup</Button>
      </form>
      {errors.map((error, i) => <Typography key={i}>{ error }</Typography>)}
    </div>
  );
}

export default Signup;

