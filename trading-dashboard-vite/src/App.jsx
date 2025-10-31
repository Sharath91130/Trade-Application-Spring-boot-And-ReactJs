import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChartPanel from './components/ChartPanel'
import StockDashboard from './components/StockDashboard'
import { Route, Router, Routes } from 'react-router-dom'
import RecommendationForm from './components/RecommendationForm'
import InvestorPortfolio from './components/InvestorComponents/InvestorPortfolio'

import NotificationSender from './components/Notification/NotificationSender'
import NotificationReceiver from './components/Notification/NotificationReceiver'
import ChatDemo from './components/Notification/ChatDemo'
import Connect from './components/Notification/ChatDemo'
import SseDemo from './components/Notification/SeeEvents'
import TraderHistoryCard from './components/Trader/TraderHistoryCard'

function App() {
//   return (
  
//       <Routes>
//         <Route path="/" element={<NotificationClient />} />
//       <Route path='/chart' element={<ChartPanel/>}/>
//       <Route path='/recommend' element={<RecommendationForm/>}/>
//       </Routes>

//   )
// }
 return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Real-Time Notifications</h1>
      <TraderHistoryCard/>
      {/* //<NotificationReceiver /> */}
    </div>
  );
};
export default App
