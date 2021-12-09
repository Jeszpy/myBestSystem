import { React } from 'react'
import {
  // Switch,
  // Route,
  Link,
} from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'
import logo from '../images/Logo.jpg'

// TODO: отцентровать навбар!!!

export const Header = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              style={{ marginRight: '10px' }}
              alt="Logo"
              src={logo}
              width="35"
              height="35"
              className="d-inline-block align-top"
            />
            ACMS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Пользователи" id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/api/users/getUsers">Список пользователей</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/api/users/addUser">Добавить пользователя</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/api/users/editUser">
                    Редактировать пользователя
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Структура предприятия"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">
                  Показать структуру
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Добавить новое подразделение
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#pricing">Устройства</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <Link to="/">Настройки</Link>
              </Nav.Link>
              <Nav.Link>Выйти</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
