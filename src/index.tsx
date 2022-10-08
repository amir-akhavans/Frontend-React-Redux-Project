import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import { BrowserRouter as Router } from 'react-router-dom'

// console.clear()
// store.dispatch({
//   type: 'test',
//   payload: {
//     description: 'bug1',
//   },
// })
// console.log('the STOREEEEEEE', store.getState())
const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
