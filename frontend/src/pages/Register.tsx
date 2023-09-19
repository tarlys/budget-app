import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [passwordType, setPasswordType] = useState('password')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

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

  const onChange = (event: any) => {
    setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
  }

  const togglePassword = () => {
    passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')
  }

  const generatePassword = () => {
    let randomstring = Math.random().toString(36).slice(-8)
    setFormData((prevState) => ({ ...prevState, password: randomstring, password2: randomstring }))
  }

  const onSubmit = (event: any) => {
    event.preventDefault()
    if (password !== password2) {
      toast.error('Паролі не співпадають')
    } else {
      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='mb-6'>
          <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            ПІБ
          </label>
          <input type='text' id='name' name='name' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Введіть прізвище ім&#39;я по батькові' value={name} onChange={onChange} required />
        </div>
        <div className='mb-6'>
          <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            E-mail
          </label>
          <input type='email' id='email' name='email' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Введіть ваш e-mail' value={email} onChange={onChange} required />
        </div>

        <div className='flex flex-row'>
          <div className='mb-6 basis-10/12'>
            <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Пароль
            </label>
            <input type={passwordType} name='password' id='password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ' placeholder='Ваш пароль' value={password} onChange={onChange} required />
          </div>

          <div className='mb-6 basis-1/12'>
            <button type='button' className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-2 mt-7 ml-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' onClick={togglePassword}>
              Показати
            </button>
          </div>

          <div className='mb-6 basis-1/12'>
            <button type='button' className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-2 mt-7 ml-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900' onClick={generatePassword}>
              Згенерувати
            </button>
          </div>
        </div>

        <div className='flex flex-row'>
          <div className='mb-6 basis-11/12'>
            <label htmlFor='password2' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Підтвердження пароля
            </label>
            <input type={passwordType} name='password2' id='password2' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Підтвердіть ваш пароль' value={password2} onChange={onChange} required />
          </div>

          <div className='mb-6 basis-1/12'>
            <button type='button' className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3.5 mr-2 mb-2 mt-7 ml-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' onClick={togglePassword}>
              Показати
            </button>
          </div>
        </div>
        <div className='mb-6 float-right'>
          <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Зареєструвати</button>
        </div>
      </form>
    </>
  )
}
export default Register
