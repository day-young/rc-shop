import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import './Detail.scss'

function Cart(props) {
  return (
    <div>
      <Table hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>수정</th>
          </tr>
        </thead>
        <tbody>
          {props.state.map((p, i) => {
            return (
              <장바구니줄
                product={p}
                key={i}
                dispatch={props.dispatch}
              ></장바구니줄>
            )
          })}
        </tbody>
      </Table>
      {props.alert열렸니 === true ? (
        <div className="my-alert my-alert-red m-1">
          <p>지금 구매하시면 신규할인 20%</p>
          <Button
            onClick={() => {
              props.dispatch({ type: '닫기' })
            }}
          >
            ✔
          </Button>
        </div>
      ) : null}
    </div>
  )
}

function 장바구니줄(props) {
  return (
    <tr>
      <td>{props.product.id}</td>
      <td>{props.product.name}</td>
      <td>{props.product.quan}</td>
      <td>
        <Button
          className="m-1"
          variant="outline-dark"
          onClick={() => {
            props.dispatch({
              type: '수량증가',
              productId: props.product.id,
            })
          }}
        >
          +
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => {
            props.dispatch({ type: '수량감소', productId: props.product.id })
          }}
        >
          -
        </Button>
      </td>
    </tr>
  )
}

function convertProps(state) {
  return {
    // 상품명 : state[0].name
    state: state.reducer,
    alert열렸니: state.reducer2,
  }
}
export default connect(convertProps)(Cart)
// export default Cart
