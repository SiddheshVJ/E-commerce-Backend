import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
// import { Dashboard } from './pages/Dashboard.js'
import { Login } from './pages/Login.js'
import { ResetPass } from './pages/ResetPass.js'
import { ForgotPass } from './pages/ForgotPass.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reset-password' element={<ResetPass />} />
        <Route path='/forgot-password' element={<ForgotPass />} />
        <Route path='/admin' element={<MainLayout />}>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
