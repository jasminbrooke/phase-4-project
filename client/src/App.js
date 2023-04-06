import React, { useState, useEffect } from 'react'
// import { Box, Button, TextField } from '@mui/material';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BrowserRouter, Route, NavLink, Routes as Switch } from "react-router-dom";
import Login from './Login'
import UserHome from './UserHome'

// check if a user is logged in
// Then render their home page if they are
// --- ok now what?
// Or render the login screen if they are not
// What about signing up? - username, password, and confirmation

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  // const [users, setUsers] = useState([])

  // useEffect(() => {
  //   getUsers()
  // }, [])

  // const getUsers = () => {
  //   fetch(`/users`)
  //   .then(r => r.json())
  //   .then(data => {
  //     setUsers(data) // this data is an array of every user with their nested stuff
  //   })
  // }

//   const renderUsers = () => {
//     return (<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
//         {
//             users.map(user => 
//                 <Card 
//                 key={user.id} 
//                 // onClick={() => handleLogin(user.id)}
//                 >
//                     <CardContent align='center'>
//                         <AccountCircleIcon fontSize="large"/>
//                         <Typography variant="body2" color="text.secondary">
//                             {user.name} 
//                         </Typography>
//                     </CardContent>
//                 </Card>
//             )
//         }
//     </Box>)
// }

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
            handleLogout={handleLogout}
           />
  } else {
    return <Login handleLogin={handleLogin} />
  }
})


  return (
    <div>
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              {/* <NavLink to="/login">Log In</NavLink> */}
            </li>
          </ul>
        </nav>
        <Switch>
          {/* <Route exact path="/login" element={<Login />}/> */}
        </Switch>
      </div>
    </BrowserRouter>
     <div className="App">
       {/* {renderUsers()} */}
       {renderPage()}
     </div>
  </div>
  );
}

export default App;
