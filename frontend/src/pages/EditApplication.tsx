import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTicket, reset, deleteTicket, updateTicket } from '../features/tickets/ticketSlice'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function EditApplication() {
  const { user } = useSelector((state: any) => state.auth)
  const { ticket, isLoading, isError, isSuccess, message } = useSelector((state: any) => state.ticket)

  const [disabled, setDisabled] = useState(true)
  const [userStatusDisabled, setUserStatusDisabled] = useState(false)
  const [formData, setFormData] = useState({
    price: 0,
    count: 0,
    summary: 0,
    id: '',
    date: '',
    username: '',
    applicationType: '',
    company: '',
    unit: '',
    place: '',
    type: '',
    applicationName: '',
    spareParts: false,
    month: '2024-01',
    needless: '',
    provider: '',
    comment: '',
    status: '',
    time: '',
  })

  let { price, count, id, date, username, applicationType, company, unit, place, type, applicationName, spareParts, month, needless, provider, comment, time, status, summary } = formData

  // const setStatus = (status: string) => {
  //   if (status === 'onDraft') {
  //     return 'Чернетка'
  //   }
  //   if (status === 'onSubmit') {
  //     return 'На затвердження'
  //   }
  //   if (status === 'submitted') {
  //     return 'Затвердженно'
  //   }
  //   if (status === 'decline') {
  //     return 'Заявка відхилена'
  //   }
  //   if (status === 'return') {
  //     return 'Поверненно на допрацювання'
  //   }
  // }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const params = useParams()
  const { ticketId } = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
  }, [isError, message, ticketId, dispatch])

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setFormData(ticket)
    }
  }, [isSuccess, isLoading, ticket])

  useEffect(() => {
    if (!user.isAdmin) {
      if (status === 'submitted' || status === 'decline') {
        setUserStatusDisabled(true)
      }
    }
  }, [status])

  useEffect(() => {
    setFormData((prevState: any) => ({ ...prevState, summary: price * count }))
  }, [price, count])

  const onChange = (event: any) => {
    setFormData((prevState: any) => ({ ...prevState, [event.target.name]: event.target.value }))
  }

  const onDraftButton = (event: any) => {
    event.preventDefault()

    if (status !== 'submitted') {
      dispatch(updateTicket({ ticketId, formData }))
    }
    dispatch(reset())
    navigate('/')
  }

  const onDeleteButton = (event: any) => {
    event.preventDefault()
    dispatch(deleteTicket(ticketId))
    dispatch(reset())
    navigate('/')
  }

  if (isLoading && !isSuccess) {
    return <Spinner />
  }

  return (
    <>
      <form>
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault()

            // if (status === 'onSubmit' || status === 'submitted' || status === 'decline') {
            //   toast.error('Редагування заборонено. Заявка знаходится на опрацюванні.')
            //   return
            // }

            const forbiddenStatuses = ['onSubmit', 'submitted', 'decline']

            if (forbiddenStatuses.includes(status) && !user.isAdmin) {
              toast.error('Редагування заборонено. Статус заявки не дозволяє редагування')
              return
            }
            setDisabled(!disabled)
          }}
          className={!disabled ? 'py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700' : 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'}
        >
          Редагувати
        </button>

        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='mb-6'>
            <label htmlFor='date' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Дата заповнення анкети
            </label>
            <input type='date' id='date' name='date' value={date} className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled required />
          </div>

          <div className='mb-6'>
            <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              ПІБ того хто заповнює анкету
            </label>
            <input type='text' id='username' name='username' value={username} className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Ваше імя та прізвище' disabled required />
          </div>
        </div>

        <div className='grid md:grid-cols-3 md:gap-6'>
          <div className='mb-6'>
            <label htmlFor='application-type' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Тип заявки
            </label>
            <select id='application-type' name='applicationType' value={applicationType} onChange={onChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled={disabled} required>
              <option value='select'>Виберіть тип заявки</option>
              <option value='budget'>Бюджет</option>
              <option value='non-budget'>Позабюджетні кошти</option>
            </select>
          </div>

          <div className='mb-6'>
            <label htmlFor='companies' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Виберіть компанію
            </label>
            <select id='companies' name='company' value={company} onChange={onChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled={disabled} required>
              <option value='select'> Виберіть команію до якої відноситься заявка</option>
              <option value='IG'>IG</option>
              <option value='SKY'>SKY</option>
              <option value='WB'>WB</option>
            </select>
          </div>

          <div className='mb-6'>
            <label htmlFor='unit' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Виберіть відділ
            </label>
            <select id='unit' name='unit' onChange={onChange} value={unit} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled={disabled} required>
              <option value='select'>Виберіть відділ до якого відноситься заявка</option>
              <option value='company'>Компанія</option>
              <option value='direction'>Дирекція</option>
              <option value='admin'>Адміністративно-господарчий відділ</option>
              <option value='financial'>Фінансовий відділ</option>
              <option value='security'>Відділ Безпеки</option>
              <option value='control'>Контрольно-ревізійний відділ</option>
              <option value='lawyer'>Юридичний відділ</option>
              <option value='foreign-economic'>Відділ ЗЕД</option>
              <option value='marketing'>Відділ маркетингу</option>
              <option value='business-dev-app'>Відділ Розробки Бізнес-Додатків</option>
              <option value='it'>Відділ інформаційних технологій</option>
              <option value='hr'>Відділ HR</option>
              <option value='client'>Відділ по роботі з клієнтами</option>
              <option value='storage'>Склад</option>
              <option value='tech-support'>Відділ технічної підтримки</option>
              <option value='lubricants-lab'>Лабораторія мастильних матеріалів</option>
              <option value='industrial-equipment'>Відділ промислового обладнання</option>
              <option value='b2b'>Комерційний відділ B2B</option>
              <option value='transport'>Відділ Транспорт</option>
              <option value='industrial'>Відділ Промисловість</option>
              <option value='agriculture'>Відділ Сільське господарство</option>
              <option value='industry'>Відділ Індустрія</option>
              <option value='b2c'>Комерційний відділ B2C</option>
              <option value='pcmo-acto'>Відділ PCMO АСТО</option>
              <option value='pcmo-retail'>Відділ PCMO Роздріб</option>
              <option value='internet-sales'>Відділ інтернет продажів</option>
            </select>
          </div>
        </div>

        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='mb-6'>
            <label htmlFor='place' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Місце де заявка буде реалізована
            </label>
            <select id='place' name='place' value={place} onChange={onChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled={disabled} required>
              <option value='select'>Виберіть адресу</option>
              <option value='kyiv-sverstyka'>м. Київ, вул. Сверстюка Євгена, буд.11-А, кв. (офіс) прим. 1202</option>
              <option value='brovary-zaliznychna'>Склад Бровари Залізнична 4</option>
              <option value='brovary-moskalenka'>Склад резервний Бровари Москаленка 16 б</option>
              <option value='dnipro-archive'>Архів Дніпро</option>
              <option value='dnipro-laboratory'>Лабораторія Дніпро Юдіна 6 </option>
              <option value='dnipro-oil-cleaning'>Будівля маслоочистки Дніпро Юдіна 2а </option>
              <option value='dnipro-office'>Офіс Дніпро проспект Д. Яворницького 88а </option>
              <option value='dnipro-storage'>Склад Дніпро Юдіна 2а </option>
              <option value='dnipro-lamana'>Юр.адреса Дніпро Ламана 17 </option>
              <option value='dnipro-sichvyh'>Юр.адреса Дніпро Січових Стрільців 20 </option>
              <option value='dnipro-grushevskogo'>Юр.адреса Дніпро Михайла Грушевського 59а</option>
              <option value='kyiv-chervonotkatska'>Офіс Київ Червоноткацька 42А </option>
              <option value='lviv-gorodockogo'>Офіс Львів Городоцького 172 </option>
              <option value='lviv-persenkyva'>Склад Львів Персенкивка 72 </option>
              <option value='odessa-storage-ysativska'>Склад Одеська область, Біляївський район, сільська рада Усатівська, автод-га Київ-Одеса 462км+930м</option>
              <option value='khmelnytskyi-storage'>Склад Хмельницький Пілотська 77/5</option>
              <option value='exclusion'>Виключення (не підходять інші варіанти)</option>
            </select>
          </div>

          <div className='mb-6'>
            <label htmlFor='type' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Вид основного засобу
            </label>
            <select id='type' name='type' value={type} onChange={onChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled={disabled} required>
              <option value='select'>Виберіть тип основного засобу</option>
              <option value='home-tech'>Побутова техніка</option>
              <option value='lab-equipment'>Лабораторне обладнання</option>
              <option value='storage-equipment'>Складське обладнання</option>
              <option value='labor-protection-equipment'>Засоби охорона праці</option>
              <option value='it-equipment'>IT-техніка</option>
              <option value='furniture'>Меблі</option>
              <option value='cars'>Автомобілі</option>
              <option value='tools'>Інструменти</option>
              <option value='sequrity-equipment'>Засоби служба безпеки</option>
              <option value='software'>Програмне забезпечення</option>
              <option value='another-equipment'>Інші основні засоби</option>
              <option value='repairment'>Ремонт приміщення</option>
            </select>
          </div>
        </div>

        <div className='mb-6'>
          <label htmlFor='application-name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Найменування що потрібно
          </label>
          <input type='text' name='applicationName' value={applicationName} onChange={onChange} id='application-name' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Найменування позиції яка потрібна' disabled={disabled} required />
        </div>

        <div className='flex items-center mb-4'>
          <input id='spare-parts' name='spare-parts' type='checkbox' checked={spareParts} onChange={onChange} className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' disabled={disabled} required />
          <label htmlFor='spare-parts' className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Купівля запчастини до вже наявного основного засобу
          </label>
        </div>

        <div className='grid md:grid-cols-4 md:gap-6'>
          <div className='mb-6'>
            <label htmlFor='month' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Місяць і рік придбання
            </label>
            <input type='month' name='month' id='month' min='2024-01' value={month} onChange={onChange} className='block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled={disabled} required />
          </div>

          <div className='mb-6'>
            <label htmlFor='count' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Кількість
            </label>
            <input type='number' id='count' name='count' className='block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Введіть кількість' value={count} disabled={disabled} onChange={onChange} required />
          </div>

          <div className='mb-6'>
            <label htmlFor='price' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Ціна
            </label>
            <input type='number' id='price' name='price' value={price} onChange={onChange} className='block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Введіть ціну в грн за одиницю' disabled={disabled} required />
            <p id='helper-text-explanation' className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
              Ціна за од., грн. без ПДВ
            </p>
          </div>

          <div className='mb-6'>
            <label htmlFor='summary' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Разом
            </label>
            <input type='text' id='summary' name='summary' aria-label='disabled input' className='mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Сумма(кількість * ціна)' value={summary} disabled required />
          </div>
        </div>

        <div className='mb-6'>
          <label htmlFor='needless' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Обґрунтування необхідності придбання (мета)
          </label>
          <textarea id='needless' name='needless' value={needless} onChange={onChange} className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Коротко обгрунтуйте навіщо вам ця інвестиція та її потреба чи прибутковість' disabled={disabled} required />
        </div>

        <div className='mb-6'>
          <label htmlFor='provider' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Постачальник
          </label>
          <input type='text' value={provider} onChange={onChange} id='provider' name='provider' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Введіть назву компанії постачальника товара чи послуги' disabled={disabled} required />
        </div>

        <div className='mb-6'>
          <label htmlFor='comment' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Коментар (наприклад: посилання на варіанти, альтернативні варіанти постачальників){' '}
          </label>
          <textarea id='comment' name='comment' value={comment} onChange={onChange} className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Місце для коментаря' disabled={disabled} required />
        </div>

        <div className='mb-6'>
          <label htmlFor='date' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Статус
          </label>
          <select id='application-type' name='status' value={status} onChange={onChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled={disabled ? disabled : userStatusDisabled} required>
            {!user.isAdmin && <option value='onDraft'>Чернетка</option>}
            {user.isAdmin && status === 'onSubmit' && <option value='onSubmit'>На затвердження</option>}
            {!user.isAdmin && status === 'return' && <option value='return'>На доопрацювання</option>}
            {user.isAdmin && (
              <>
                <option value='return'>На доопрацювання</option>
                <option value='decline'>Заявка відхилена</option>
              </>
            )}
            <option value='submitted'>Затверджено</option>
          </select>
        </div>

        <div className='grid md:grid-cols-2 md:gap-6'>
          {/* <button type='submit' onClick={onDraftButton} className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>
            В чернетку
          </button> */}
          {/* {status !== 'submitted' && status !== 'decline' && ( */}
          <button onClick={onDraftButton} className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
            Відправити
          </button>
          {/* )} */}

          {!user.isAdmin && status !== 'submitted' && (
            <button onClick={onDeleteButton} className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
              Видалити
            </button>
          )}
        </div>
      </form>
    </>
  )
}
export default EditApplication
