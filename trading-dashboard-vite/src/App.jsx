import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChartPanel from './components/ChartPanel'
import StockDashboard from './components/StockDashboard'
import { Route, Router, Routes } from 'react-router-dom'

function App() {
  return (
  
      <Routes>
        <Route path="/" element={<StockDashboard />} />
      <Route path='/chart' element={<ChartPanel/>}/>
      </Routes>

  )
}

export default App
