import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password
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
            input type='password'

        />
        <Button type="submit">Login</Button>
      </form>
      {errors.map((error, i) => <Typography key={i}>{ error }</Typography>)}
      
    </div>
  );
}

export default Login;

