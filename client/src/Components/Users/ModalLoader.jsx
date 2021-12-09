import React from 'react'
import { Modal, Spinner, Button } from 'react-bootstrap'
import statusOK from '../../images/addUserSuccess.png'
import statusError from '../../images/addUserError.png'

export const ModalLoader = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ожидайте...
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <Spinner animation="border" variant="primary" size="lg" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  )
}

export const ModalLoaderOK = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Пользователь успешно добавлен
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <img src={statusOK} alt="statusOK" style={{ width: '75px' }} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  )
}

export const ModalLoaderError = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Упс... Ошибка!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <img src={statusError} alt="statusError" style={{ width: '75px' }} />
          <p>Пользователь с таким индефикатором уже существует!</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  )
}
