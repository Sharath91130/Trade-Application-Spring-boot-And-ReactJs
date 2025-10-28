import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChartPanel from './components/ChartPanel'
import StockDashboard from './components/StockDashboard'
import { Route, Router, Routes } from 'react-router-dom'
import UpstoxWebSocket from './components/Websocket'
import MarketDataFeed from './components/MarketFeed'
import UpstoxFeed from './components/UpstockFeed'
import MarketFeed from './components/MarketFeed'

function App() {
  return (
  
      <Routes>
        <Route path="/" element={<UpstoxFeed />} />
      <Route path='/chart' element={<ChartPanel/>}/>
      </Routes>

  )
}

export default App
