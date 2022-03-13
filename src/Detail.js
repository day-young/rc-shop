import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Nav, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import './Detail.scss'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'

function Detail(props) {
  useEffect(() => {
    let timer = setTimeout(() => {
      alertState(false)
    }, 2000)
  }, [])

  let { id } = useParams()
  const data = props.shoes.find(shoes => shoes.id == id)
  const pId = Number(data.id)
  let [alert, alertState] = useState(true)
  let [누른탭, 누른탭변경] = useState(0)
  let [스위치, 스위치변경] = useState(false)

  let history = useHistory()

  let recentlyView =
    localStorage.getItem('rv') ||
    localStorage.setItem('rv', JSON.stringify({ id: pId }))
  // JSON.stringify({ id: [pId, pId] })
  let test = JSON.parse(recentlyView)
  console.log(test.id)
  // console.log(new Set([...recentlyView]))

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${+id + 1}.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{data.title}</h4>
          <p>{data.content}</p>
          <p>{data.price}</p>
          <button
            className="btn btn-danger m-1"
            onClick={() => {
              props.dispatch({
                type: '주문하기',
                payload: { id: data.id, name: data.title, quan: 1 },
              })
              // history.push('/cart')
            }}
          >
            주문하기
          </button>
          <button className="btn btn-danger" onClick={() => history.goBack()}>
            뒤로가기
          </button>
        </div>
      </div>
      <Row xs={2} md={4} lg={6}>
        <Col>1 of 2</Col>
      </Row>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              스위치변경(false)
              누른탭변경(0)
            }}
          >
            Description
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              스위치변경(false)
              누른탭변경(1)
            }}
          >
            Review
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={() => {
              스위치변경(false)
              누른탭변경(2)
            }}
          >
            Q&A
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <>
        <CSSTransition in={스위치} classNames="wow" timeout={500}>
          <TabContent 누른탭={누른탭} 스위치변경={스위치변경} />
        </CSSTransition>
      </>
    </div>
  )

  function TabContent(props) {
    useEffect(() => {
      props.스위치변경(true)
    })

    if (props.누른탭 === 0) {
      return <div>0번</div>
    } else if (props.누른탭 === 1) {
      return <div>1번</div>
    } else if (props.누른탭 === 2) {
      return <div>2번</div>
    }
  }
}

function convertProps(state) {
  return {
    state: state.reducer,
    alert열렸니: state.reducer2,
  }
}
export default connect(convertProps)(Detail)
