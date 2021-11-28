import 'bootstrap/dist/css/bootstrap.min.css'

import {
  // Switch,
  Routes,
  Route,
  Link,
} from 'react-router-dom'
import { Header } from './Components/Header'
import { UsersList } from './Components/Users/UsersList'
import { AddUser } from './Components/Users/AddUser'
import { EditUser } from './Components/Users/EditUser'
import { Settings } from './Components/Settings/Settings'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/api/users/getUsers" exact element={<UsersList />} />
        <Route path="/api/users/addUser" element={<AddUser />} />
        {/* path="/api/users/editUser/:id" */}
        <Route path="/api/users/editUser" element={<EditUser />} />
        <Route path="/api/settings/mainSettings" element={<Settings />} />
      </Routes>
      {/* <UsersList /> */}
    </>
  )
}

export default App
