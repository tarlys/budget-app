import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Form from './pages/Form'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'
import EditApplication from './pages/EditApplication'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            {/* <Route path='/' element={<PrivateRoute />}> */}
            <Route path='/' element={<Home />} />
            {/* </Route> */}
            <Route path='/form' element={<PrivateRoute />}>
              <Route path='/form' element={<Form />} />
            </Route>
            <Route path='/form/:ticketId' element={<PrivateRoute />}>
              <Route path='/form/:ticketId' element={<EditApplication />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer position='top-center' hideProgressBar />
    </>
  )
}

export default App
