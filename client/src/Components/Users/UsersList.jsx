import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import editUser from '../../images/editUser.png'

// добавить изменение скорости таймера для первой загрузки

export const UsersList = () => {
  let [usersList, setUsersList] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      axios.get('/api/users/getUsers').then((res) => setUsersList(res.data))
    }, 500)
    return () => clearTimeout(timer)
  })

  // добавить в маппинг кнопку с el[0], что бы вызывать карточку из АПИ конкретного пользователя

  let usersTable = usersList.map((el) => (
    <tbody>
      <tr>
        <td>
          {/* заменить на Link!!! */}
          <a href="#">
            <img
              src={editUser}
              style={{ width: '35px', marginLeft: '10px' }}
            ></img>
          </a>
        </td>
        <td></td>
        <td>{el[1]}</td>
      </tr>
    </tbody>
  ))

  return (
    <>
      <Table responsive="sm">
        <thead>
          {/* tr!!!!  style={{ display: 'flex', justifyContent: 'space-evenly' }} */}
          <tr>
            <th></th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Подразделение</th>
            <th>Уровень доступа</th>
            <th>№ индентификатора</th>
          </tr>
        </thead>
        {usersTable}
      </Table>
    </>
  )
}
