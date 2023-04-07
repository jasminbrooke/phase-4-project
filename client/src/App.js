import React, { useState, useEffect } from 'react'
// import { Box, Button, TextField } from '@mui/material';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Login from './Login'
import Signup from './Signup'
import UserHome from './UserHome'


function App() {
  const [currentUser, setCurrentUser] = useState(null)

useEffect(() => {
  fetch("/me").then((response) => {
    if (response.ok) {
      response.json().then((user) => setCurrentUser(user));
      // call users#show and check if anyone is logged in by checking the session
      // if so, set them as the current user
      // if not, do nothing
    }
  });
}, []);

const handleLogin = (user) => setCurrentUser(user)
const handleLogout = () => {
  fetch('/logout', {
      method: 'DELETE',
  })
  .then(() => setCurrentUser(null))
}

  const renderPage = (() => {
    if(currentUser) {
      return <UserHome 
              currentUser={currentUser}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
            />
    } else {
      return (
        <>
          <Login handleLogin={handleLogin} />
          <Signup handleLogin={handleLogin} />
        </>
      )
    }
  })

  return (
    <div>
      <div className="App">
        {/* {renderUsers()} */}
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
