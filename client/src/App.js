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
import { AddNewUser } from './Components/Users/ModalLoader'
import { EditUser } from './Components/Users/EditUser'
import { Settings } from './Components/Settings/Settings'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<Settings />} />
        <Route path="/api/users/getUsers" exact element={<UsersList />} />
        <Route path="/api/users/addUser" element={<AddUser />} />
        {/* <Route path="/api/users/addUser" element={<AddNewUser />} /> */}
        {/* path="/api/users/editUser/:id" */}
        <Route path="/api/users/editUser" element={<EditUser />} />
      </Routes>
      {/* <UsersList /> */}
    </>
  )
}

export default App
