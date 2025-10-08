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
import Abac from './pages/Abac';
import AbacLogin from './components/abacLab/AbacLogin';
import AbacRegisterUser from './components/abacLab/AbacRegister';
import Options from './components/abacLab/Options';

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
              <Route path='abac' element={<Abac />}>
                <Route path='/abac/login' element={<AbacLogin />} />
                <Route path='/abac/register' element={<AbacRegisterUser />} />
                <Route path='/abac/tasks' element={<Options />} />
              </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
