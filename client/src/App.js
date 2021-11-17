import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Users from './Components/Users/Users'
// import List from './Components/Users/List'
// import Add from './Components/Users/Add'
import Events from './Components/Events'

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          {/* <Route path="/" element={<Navbar />} /> */}
          <Route path="/users/*" exact element={<Users />} />
          {/* <Route path=":usersList" element={<List />} />
          <Route path="/users/new" element={<Add />} /> */}
          <Route path="/events" element={<Events />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
