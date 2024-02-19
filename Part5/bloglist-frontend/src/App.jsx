import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import AllUserView from './views/AllUserView'
import UserView from './views/UserView'
import BlogView from './views/BlogView'
import NotificationMessage from './components/NotificationMessage'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Bloglist App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-40">
              <Link to="/">
                <Navbar.Text>Home</Navbar.Text>
              </Link>
              <Link to="/allUsers">
                <Navbar.Text>All Users</Navbar.Text>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Link to="/">
        <p>home</p>
      </Link>
      <Link to="/allUsers">
        <p>all Users</p>
      </Link>
      <NotificationMessage />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allUsers" element={<AllUserView />} />
        <Route path="/user/:id" element={<UserView />} />
        <Route path="/blog/:id" element={<BlogView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
