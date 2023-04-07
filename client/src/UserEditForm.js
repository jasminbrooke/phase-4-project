import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';


const UserEditForm = ({ currentUser, handleLogin, handleDelete }) => {
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
    <div className='nav-component'>
      <Card sx={{ width: 350 }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="user-edit-field">
            <TextField
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              size="small"
            />
          </div>
          <div className="user-edit-field">
            <TextField
              className="user-edit-home"
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              size="small"
            />
          </div>
          <Button type="submit">Update Profile</Button>
        </form>
        <div id='delete-container'>
          <Button onClick={() => handleDelete()}>Delete Account</Button>
        </div>
      </Card>
      {errors.map((error, i) => <Typography key={i}>{ error }</Typography>)}
    </div>
  );
}

export default UserEditForm;

