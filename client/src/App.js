import React, { useState, useEffect, createContext } from 'react'
import Typography from '@mui/material/Typography';
import Login from './Login'
import Signup from './Signup'
import UserHome from './UserHome'

export const UserContext = createContext(null)

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
      return (
        <UserContext.Provider value={currentUser}>
          <UserHome 
              handleLogin={handleLogin}
              handleLogout={handleLogout}
            />
        </UserContext.Provider>
      )
    } else {
      return (
        <div id="login">
          <Typography variant="h4">MyRecipes</Typography>
          <Typography variant="h4">Log In or Sign Up!</Typography>
          <Login handleLogin={handleLogin} />
          <Signup handleLogin={handleLogin} />
        </div>
      )
    }
  })

  return (
    <div>
      <div className="App">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
