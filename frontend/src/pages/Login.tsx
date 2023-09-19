import { FormEvent, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state: any) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    //Redirect when logged in
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='mb-6'>
          <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            E-mail
          </label>
          <input type='email' id='email' name='email' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ' placeholder='Введіть ваш e-mail' value={email} onChange={onChange} required />
        </div>
        <div className='mb-6'>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Пароль
          </label>
          <input type='password' id='password' name='password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Введіть пароль' value={password} onChange={onChange} required />
        </div>
        <div className='mb-6'>
          <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Вхід</button>
        </div>
      </form>
    </>
  )
}
export default Login
