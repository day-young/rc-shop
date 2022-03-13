import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import Data from './data.js'

let 초기값 = [
  { id: 0, name: '젤-카야노 5 OG - 화이트:블랙 / 1191A099-101', quan: 1 },
  { id: 4, name: '척 70 클래식 블랙 162050C', quan: 1 },
]

function reducer(state = 초기값, 액션) {
  if (액션.type === '주문하기') {
    let isIn = state.findIndex(s => {
      return s.id === 액션.payload.id
    })
    let copy = [...state]
    isIn >= 0 ? copy[isIn].quan++ : copy.push(액션.payload)

    console.log(copy)
    return copy
    // return state
  } else if (액션.type === '수량증가') {
    let isIn = state.findIndex(s => {
      return s.id === 액션.productId
    })
    let copy = [...state]
    copy[isIn].quan++
    return copy
  } else if (액션.type === '수량감소') {
    let isIn = state.findIndex(s => {
      return s.id === 액션.productId
    })
    let copy = [...state]
    if (copy[isIn].quan > 1) copy[isIn].quan--
    return copy
  } else {
    return state
  }
}

let alert초기값 = true

function reducer2(state = alert초기값, 액션) {
  if (액션.type === '닫기') {
    return (state = false)
  } else {
    return state
  }
}

let store = createStore(combineReducers({ reducer, reducer2 }))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
