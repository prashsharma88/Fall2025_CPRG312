import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import CachingHome from './pages/CachingHome';
import Home from './pages/Home';
import PasswordHashing from './pages/PasswordHashing';
import HomeBtn from './components/HomeBtn';
import LoginUser from './components/passwordLab/LoginUser';
import RegisterUserForm from './components/passwordLab/RegisterUserForm';
import Rbac from './pages/Rbac';
import Login from './components/rbacLab/Login';
import RegisterUser from './components/rbacLab/RegisterUser';
import Project from './components/rbacLab/Project';
import { AuthProvider } from './context/AuthProvider';

function App() {

  return (
    <>
      
      <Router>
        <HomeBtn />
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/caching_demo' element={<CachingHome/>} />
            <Route path='/password_hashing_demo' element={<PasswordHashing/>}>
              <Route path='/password_hashing_demo/login' element={<LoginUser/>} />
              <Route path='/password_hashing_demo/register' element={<RegisterUserForm/>} />
            </Route>
              <Route path='rbac' element={<Rbac/>}>
                <Route path='/rbac/login' element={<Login/>}/>
                <Route path='/rbac/register' element={<RegisterUser/>} />
                <Route path='/rbac/project' element={<Project />} />
              </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
