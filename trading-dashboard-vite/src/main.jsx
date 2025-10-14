import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import StockChart from './components/Chart'
import TradingViewChart from './components/Chart'
import ChartPanel from './components/ChartPanel'
import StockDashboard from './components/StockDashboard'

import { BrowserRouter as Router } from "react-router-dom";



ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Router>
      <App />
    </Router>
 
)
