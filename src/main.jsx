import React from 'react'
import ReactDOM from 'react-dom' // Changed import
import App from './App.jsx'
import './index.css'

ReactDOM.render( // Using older render method
  <App />, // Removed StrictMode wrapper
  document.getElementById('root')
)