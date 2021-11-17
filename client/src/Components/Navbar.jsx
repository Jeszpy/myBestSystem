import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <div>
        Navbar
        <Link to="/users">Users</Link>
        <Link to="/events">Events</Link>
        Navbar
      </div>
    </>
  )
}

export default Navbar
