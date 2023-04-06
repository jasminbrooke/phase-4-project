import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

const UserEditForm = ({ currentUser, handleLogin }) => {
  const [name, setName] = useState(currentUser.name);
  const [username, setUsername] = useState(currentUser.username);
  const [errors, setErrors] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/users/${currentUser.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            username: username
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
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
        />
        <TextField
            //  error={errors.productname}
            // helperText={errors.productname}
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            size="small"
        />
        <Button type="submit">Update Profile</Button>
      </form>
      {errors.map((error, i) => <Typography key={i}>{ error }</Typography>)}
    </div>
  );
}

export default UserEditForm;

