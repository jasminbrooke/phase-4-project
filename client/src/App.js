import React, { useState, useEffect } from 'react'
import { Box, Button, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BrowserRouter, Route, NavLink, Routes as Switch } from "react-router-dom";
import Login from './Login.js'

function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    fetch(`/users`)
    .then(r => r.json())
    .then(data => {
      setUsers(data) // this data is an array of every user with their nested stuff
    })
  }

  const renderUsers = () => {
    return (<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        {
            users.map(user => 
                <Card 
                key={user.id} 
                // onClick={() => handleLogin(user.id)}
                >
                    <CardContent align='center'>
                        <AccountCircleIcon fontSize="large"/>
                        <Typography variant="body2" color="text.secondary">
                            {user.name} 
                        </Typography>
                    </CardContent>
                </Card>
            )
        }
    </Box>)
}



  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/login">Log In</NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/login" element={<Login />}/>
        </Switch>
      </div>
    </BrowserRouter>
    // <div className="App">
    //   L: {users.map(u => <p>{u?.name}</p>)}
    //   X:
    //   {renderUsers()}
    // </div>
  );
}

export default App;
