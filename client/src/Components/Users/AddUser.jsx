import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  Form,
  Row,
  Col,
  FloatingLabel,
  ButtonGroup,
  Button,
  Container,
} from 'react-bootstrap'
import { ModalLoader, ModalLoaderOK, ModalLoaderError } from './ModalLoader'

export const AddUser = () => {
  const [modalShow, setModalShow] = useState(false)
  const [statusOk, setStatusOK] = useState(false)
  const [statusError, setStatusError] = useState(false)
  const [cardNumberRadio, setCardNumberRadio] = useState(false)
  let [lastName, setLastName] = useState('')
  let [firstName, setFirstName] = useState('')
  let [middleName, setMiddleName] = useState('')
  let [subdivision, setSubdivision] = useState('')
  let [cardInput, setCardInput] = useState('')
  let [series, setSeries] = useState('')
  let [number, setNumber] = useState('')

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

  const firstNameHandler = (e) => {
    setFirstName(e.target.value)
  }

  const middleNameHandler = (e) => {
    setMiddleName(e.target.value)
  }

  const subdivisionHandler = (e) => {
    setSubdivision(e.target.value)
  }

  const cardInputHandler = (e) => {
    setCardInput(e.target.value)
  }

  const seriesHandler = (e) => {
    setSeries(e.target.value)
  }

  const numberHandler = (e) => {
    setNumber(e.target.value)
  }

  const saveUser = async function () {
    setModalShow(true)
    lastName = lastName.trim()
    firstName = firstName.trim()
    middleName = middleName.trim()
    subdivision = subdivision.trim()
    cardInput = cardInput.trim()
    series = series.trim()
    number = number.trim()

    const sendObject = {
      lastName: lastName,
      firstName: firstName,
      middleName: middleName,
      subdivision: subdivision,
      card: cardInput,
      series: series,
      number: number,
      sn: cardNumberRadio ? true : false,
    }

    await axios.post('/api/users/addUser', sendObject).then((res) => {
      if (res.data === 'error') {
        setModalShow(false)
        setStatusError(true)
      } else {
        setModalShow(false)
        setStatusOK(true)
        setLastName('')
        setFirstName('')
        setMiddleName('')
        setSubdivision('')
        setCardInput('')
        setSeries('')
        setNumber('')
        setTimeout(() => {
          setStatusOK(false)
        }, 1500)
      }
    })
  }

  return (
    <>
      <Container>
        <ModalLoader show={modalShow} onHide={() => setModalShow(false)} />
        <ModalLoaderOK show={statusOk} onHide={() => setStatusOK(false)} />
        <ModalLoaderError
          show={statusError}
          onHide={() => setStatusError(false)}
        />
        <Form>
          <Row className="mb-4 mt-5">
            <Col>
              <FloatingLabel controlId="floatingInput" label="Фамилия">
                <Form.Control
                  type="text"
                  placeholder="Фамилия"
                  value={lastName}
                  onChange={lastNameHandler}
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
                  value={firstName}
                  onChange={firstNameHandler}
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
                  value={middleName}
                  onChange={middleNameHandler}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* Добавить изменение стейта value={lastName} onChange={lastNameHandler}*/}
              <FloatingLabel controlId="floatingInput" label="Подразделение">
                <Form.Select
                  aria-label="Подразделение"
                  className="mb-4"
                  disabled
                >
                  <option value="0">{''}</option>
                  <option value="1">Здесь</option>
                  <option value="2">Пока</option>
                  <option value="3">Пусто</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="mb-2 w-300">
            <Col>
              <Form.Check
                inline
                label="Ввод с контрольного считывателя"
                name="group1"
                type="radio"
                id="1"
                style={{
                  marginBottom: '5px',
                  alignSelf: 'end',
                  alignItems: 'end',
                }}
                defaultChecked
                onChange={() => setCardNumberRadio(false)}
              />
              <Form.Check
                inline
                label="Серия и номер карточки"
                name="group1"
                type="radio"
                id="2"
                onChange={() => setCardNumberRadio(true)}
              />
            </Col>
          </Row>
          <Row className="mb-5 w-300">
            {cardNumberRadio ? (
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Серия"
                  className="mb-3"
                >
                  <Form.Control value={series} onChange={seriesHandler} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Номер">
                  <Form.Control value={number} onChange={numberHandler} />
                </FloatingLabel>
              </Col>
            ) : (
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="№ индентификатора"
                >
                  <Form.Control
                    placeholder="№ индентификатора"
                    value={cardInput}
                    onChange={cardInputHandler}
                    onKeyDown={hexToDec}
                  />
                </FloatingLabel>
              </Col>
            )}
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
      </Container>
    </>
  )
}
