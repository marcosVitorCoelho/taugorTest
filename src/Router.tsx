import { Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import CreateUser from './pages/auth/Register'
import { DefaultLayout } from './layout/DefaultLayout'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/home'
import EmployeePage from './pages/employee'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path={'/home'} element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path={'/employee/id:'} element={<PrivateRoute><EmployeePage /></PrivateRoute>} />
        <Route path={'/employee'} element={<PrivateRoute><EmployeePage /></PrivateRoute>} />
        <Route path={'/createUser'} element={<CreateUser />} />
        <Route path={'/'} element={<Login />} />
      </Route>
    </Routes>
  )
}