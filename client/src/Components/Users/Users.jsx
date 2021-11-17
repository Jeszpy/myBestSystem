import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
// Outlet,
import List from './List'
import AddUsers from './Add'

const Users = () => {
  return (
    <>
      <div>
        <Link to="usersList">Список пользователей</Link>
        <Link to="add">Добавить пользователя</Link>
      </div>
      <section>
        <Routes>
          <Route path="usersList" element={<List />} />
          <Route path="add" element={<AddUsers />} />
        </Routes>
      </section>
    </>
  )
}

export default Users
