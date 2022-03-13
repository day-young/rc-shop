import React, { useState, useContext, useRef, useEffect } from 'react'
import './App.css'
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'
import Data from './data.js'
import { Link, Route, Router, Switch, useHistory } from 'react-router-dom'
import Detail from './Detail.js'
import axios from 'axios'
import Cart from './Cart.js'

function App() {
  let [shoes, setShoes] = useState(Data)

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Shose React</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/Detail/0">
                Detail
              </Nav.Link>
              <Nav.Link as={Link} to="/cart">
                Cart
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <div className="jumbotron">
            <h4 className="shop-title">Shoes React</h4>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. </p>
            <Button className="btn-main" variant="link" size="lg">
              Shop Now →
            </Button>{' '}
          </div>
          <div className="container">
            <div className="row">
              {shoes.map((shoes, i) => {
                return <Card shoes={shoes} i={i} key={i} />
              })}
            </div>

            <Button
              className="btn-main btn-more"
              variant="link"
              size="lg"
              onClick={() => {
                axios
                  .get('https://codingapple1.github.io/shop/data2.json')
                  .then(res => {
                    setShoes([...shoes, ...res.data])
                  })
                  .catch(() => {
                    console.log('fail')
                  })
              }}
            >
              더보기
            </Button>
          </div>
        </Route>
        <Route path="/cart">
          <Cart></Cart>
        </Route>
        <Route path="/detail/:id">
          <Detail shoes={shoes}></Detail>
        </Route>
        <Route path="/:id">
          <div>아무거나 적었을때</div>
        </Route>
        {/* <Router path="/what" component={Modal}></Router> */}
      </Switch>
    </div>
  )

  function Card(props) {
    let history = useHistory()
    return (
      <div
        className="col-md-4"
        onClick={() => {
          history.push(`/detail/${props.shoes.id}`)
        }}
      >
        <img
          src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`}
          width="100%"
          alt={props.shoes.title}
        />
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.content}</p>
        <p>{props.shoes.price}</p>
      </div>
    )
  }
}

export default App
