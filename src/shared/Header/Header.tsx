import React, { FormEvent, useState } from 'react'
import { Navbar, Container, Nav,  Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchFilmByWord, fetchFilms } from '../../store/thunks/filmThunks';

const Header = () => {

  const [searchingFilm, setSearchingFilm] = useState('')
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate('/')
    if (searchingFilm) {
      dispatch(fetchFilmByWord(searchingFilm))
    } else {
      dispatch(fetchFilms())
    }
    
    setSearchingFilm('')
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link to='/' style={{'textDecoration': 'none'}}>
          <Navbar.Brand href="#">KinoLook</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link!} to='/favourite' style={{'textDecoration': 'none'}} >
              Избранное
            </Nav.Link>
          </Nav>
          <Form 
            className="d-flex"
            onSubmit={(e) => onSubmitHandler(e)}>
            <Form.Control
              type="text"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearchingFilm(e.currentTarget.value)}
              value={searchingFilm}
            />
            <Button 
                type='submit' 
                variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header