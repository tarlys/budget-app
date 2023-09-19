import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, logout } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state: any) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Budget app</Link>
      </div>
      <ul>
        <li>
          <Link to='/form'>
            <button type='button' className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
              Створити заявку
            </button>
          </Link>
        </li>
        {user ? (
          <li>
            <button onClick={onLogout} type='button' className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <button type='button' className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
                  Вхід
                </button>
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <button type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                  Реєстрація нового користувача
                </button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}
export default Header
