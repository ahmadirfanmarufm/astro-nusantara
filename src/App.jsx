import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import CekKhodam from './pages/CekKhodam';
import CekPrimbon from './pages/CekPrimbon';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/cekkhodam' element={<CekKhodam/>}></Route>
        <Route path='/cekprimbon' element={<CekPrimbon/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
