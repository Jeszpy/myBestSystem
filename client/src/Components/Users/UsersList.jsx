import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Table, Container, Button } from 'react-bootstrap'
import editUser from '../../images/editUser.png'
import deleteUser from '../../images/deleteUser.png'

// добавить изменение скорости таймера для первой загрузки

export const UsersList = () => {
  let [usersList, setUsersList] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      axios.get('/api/users/getUsers').then((res) => setUsersList(res.data))
    }, 500)
    return () => clearTimeout(timer)
  })

  const handleDelete = (e) => {
    const id = e.target.id
    axios.post('/api/users/deleteUser', id)
  }

  let usersTable = usersList.map((el) => (
    <tbody>
      <tr>
        <td>
          <Link to="/api/users/addUser">
            <img
              src={editUser}
              style={{ width: '35px', marginLeft: '10px' }}
            ></img>
          </Link>
          <Button
            id={el[0]}
            onClick={handleDelete}
            style={{
              border: '0',
              borderRadius: '0',
              backgroundColor: '#fff',
              padding: '0',
            }}
          >
            <img
              style={{ cursor: 'pointer' }}
              id={el[0]}
              onClick={handleDelete}
              src={deleteUser}
              style={{ width: '25px', marginLeft: '10px' }}
            ></img>
          </Button>
        </td>
        <td>{el[1]}</td>
        <td>{el[2]}</td>
        <td>{el[3]}</td>
        <td>{el[4]}</td>
        <td>{el[5]}</td>
      </tr>
    </tbody>
  ))

  return (
    <>
      <Container>
        <Table responsive className="mt-3">
          <thead>
            {/* tr!!!!  style={{ display: 'flex', justifyContent: 'space-evenly' }} */}
            <tr>
              <th></th>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>Подразделение</th>
              {/* <th>Уровень доступа</th> */}
              <th>№ индентификатора</th>
            </tr>
          </thead>
          {usersTable}
        </Table>
      </Container>
    </>
  )
}
