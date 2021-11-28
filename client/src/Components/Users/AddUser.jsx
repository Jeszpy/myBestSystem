import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Form,
  Row,
  Col,
  FloatingLabel,
  ButtonGroup,
  Button,
} from 'react-bootstrap'

export const AddUser = () => {
  const [lastName, setLastName] = useState('')
  const [name, setName] = useState('')
  const [patronymic, setPatronymic] = useState('')
  const [subdivision, setSubdivision] = useState('')
  const [cardInput, setCardInput] = useState('')

  const numberToHex = (number) => {
    const HEX = 16
    return Number(number).toString(HEX).toUpperCase()
  }

  const hexToDec = (e) => {
    if (e.key === 'Enter') {
      setCardInput(numberToHex(cardInput))
    }
  }
  const lastNameHandler = (e) => {
    setLastName(e.target.value)
  }

  const nameHandler = (e) => {
    setName(e.target.value)
  }

  const patronymicHandler = (e) => {
    setPatronymic(e.target.value)
  }

  const subdivisionHandler = (e) => {
    setSubdivision(e.target.value)
  }

  const cardInputHandler = (e) => {
    setCardInput(e.target.value)
  }

  const saveUser = () => {
    // добавить POST в API
    const sendObject = {
      lastName: lastName,
      name: name,
    }
    setLastName('')
    setName('')
    setPatronymic('')
    setCardInput('')
  }

  return (
    <>
      <Form>
        <Row className="mb-4 mt-5">
          <Col>
            <FloatingLabel controlId="floatingInput" label="Фамилия">
              <Form.Control
                type="text"
                placeholder="Фамилия"
                value={lastName}
                onChange={lastNameHandler}
                readOnly
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <FloatingLabel controlId="floatingInput" label="Имя">
              <Form.Control
                type="text"
                placeholder="Имя"
                value={name}
                onChange={nameHandler}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <FloatingLabel controlId="floatingInput" label="Отчество">
              <Form.Control
                type="text"
                placeholder="Отчество"
                value={patronymic}
                onChange={patronymicHandler}
                readOnly
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* Добавить изменение стейта value={lastName} onChange={lastNameHandler}*/}
            <FloatingLabel controlId="floatingInput" label="Подразделение">
              <Form.Select aria-label="Подразделение" className="mb-4" disabled>
                <option value="0">{''}</option>
                <option value="1">Здесь</option>
                <option value="2">Пока</option>
                <option value="3">Пусто</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <FloatingLabel controlId="floatingInput" label="№ индентификатора">
              <Form.Control
                placeholder="№ индентификатора"
                value={cardInput}
                onChange={cardInputHandler}
                onKeyDown={hexToDec}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <ButtonGroup aria-label="Basic example">
            <Button variant="success" onClick={saveUser}>
              Сохранить
            </Button>
            <Button variant="danger">
              <Link to="/api/users/getUsers">Отменить</Link>
            </Button>
          </ButtonGroup>
        </Row>
      </Form>
    </>
  )
}
