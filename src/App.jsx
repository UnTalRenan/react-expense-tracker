import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import ExpenseTracker from './pages/ExpenseTracker';
import Logu from './pages/Logu';
import Report from './pages/Report'
function App() {
  const idUser="2";
  return (
    <>
    <Router>
      <NavBar ></NavBar>
      <Routes>
        <Route path='/' element={<ExpenseTracker/>} />
        <Route path='/reports' element={<Report idUser={idUser}/>} />
        <Route path='/logout' element={<Logu/>} />
      </Routes>
     
    </Router>
  </>
  )
}

export default App
