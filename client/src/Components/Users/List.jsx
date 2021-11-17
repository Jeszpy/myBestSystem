import { React, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'

const List = () => {
  useEffect(() => {
    try {
      
    } catch (error) {
      console.log(error)
    }
    return () => {
      ws.close()
    }
  })
  return (
    <>
      <div>
        List
        <Outlet />
      </div>
    </>
  )
}

export default List
