import React from 'react'
import { Outlet } from 'react-router-dom'

const AddUsers = () => {
  const [state, setstate] = useState(initialState)
  return (
    <>
      <div>
        add
        <Outlet />
      </div>
    </>
  )
}

export default AddUsers
