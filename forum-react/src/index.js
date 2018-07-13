import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/toastr/build/toastr.min.css'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter, Route, Router, Switch} from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root'))
registerServiceWorker()
