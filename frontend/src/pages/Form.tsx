import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Label, TextInput, Select, Checkbox, Textarea } from 'flowbite-react'
// import { reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket, deleteTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'

import { Button, Modal } from 'flowbite-react'

function Form() {
  const [openModal, setOpenModal] = useState<string | undefined>()
  const props = { openModal, setOpenModal }

  const getTime = () => new Date().getHours() + ':' + new Date().getMinutes()
  const { user } = useSelector((state: any) => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector((state: any) => state.ticket)

  let [price, setPrice] = useState(0)
  let [count, setCount] = useState(1)
  let [summary, setSummary] = useState(0)
  let [date, setDate] = useState('')
  let [username, setUserName] = useState(user.name)
  let [applicationType, setApplicationType] = useState('')
  let [company, setCompany] = useState('')
  let [unit, setUnit] = useState('')
  let [place, setPlace] = useState('')
  let [type, setType] = useState('')
  let [applicationName, setApplicationName] = useState('')
  let [spareParts, setSpareParts] = useState(false)
  let [month, setMonth] = useState('2024-01')
  let [needless, setNeedless] = useState('')
  let [provider, setProvider] = useState('')
  let [comment, setComment] = useState('')
  let [status, setStatus] = useState('onDraft')
  let [time, setTime] = useState(getTime())

  const getDate = () => {
    let now = new Date()

    let day = ('0' + now.getDate()).slice(-2)
    let month = ('0' + (now.getMonth() + 1)).slice(-2)

    return now.getFullYear() + '-' + month + '-' + day
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const priceHandler = (e: any) => setPrice(e.target.value)
  const countHandler = (e: any) => setCount(e.target.value)
  const applicationTypeHandler = (e: any) => setApplicationType(e.target.value)
  const companyHandler = (e: any) => setCompany(e.target.value)
  const unitHandler = (e: any) => setUnit(e.target.value)
  const placeHandler = (e: any) => setPlace(e.target.value)
  const typeHandler = (e: any) => setType(e.target.value)
  const applicationNameHandler = (e: any) => setApplicationName(e.target.value)
  const sparePartsHandler = (e: any) => setSpareParts(e.target.checked)
  const monthHandler = (e: any) => setMonth(e.target.value)
  const needlessHandler = (e: any) => setNeedless(e.target.value)
  const providerHandler = (e: any) => setProvider(e.target.value)
  const commentHandler = (e: any) => setComment(e.target.value)

  const onClickButton = (event: any) => {
    event.preventDefault()
    setStatus(event.target.name)
  }

  const onDispatchClick = () => {
    dispatch(
      createTicket({
        price,
        count,
        summary,
        date,
        applicationType,
        company,
        unit,
        username,
        place,
        type,
        applicationName,
        spareParts,
        month,
        needless,
        provider,
        comment,
        status,
        time,
      })
    )

    navigate('/')
  }

  useEffect(() => {
    if (status === 'onSubmit') {
      console.log(status)
    }
    if (status === 'onDraft') {
      console.log(status)
    }
  }, [status])

  useEffect(() => {
    setSummary(count * price)
  }, [price, count])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      dispatch(reset())
      navigate('/')
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  useEffect(() => {
    setDate(getDate())
  }, [date])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <form>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='mb-6'>
            <div className='mb-2'>
              <Label htmlFor='date' value='Дата заповнення анкети' />
            </div>
            <TextInput type='date' id='date' name='date' value={date} disabled />
          </div>

          <div className='mb-6'>
            <Label htmlFor='username' value='ПІБ того хто заповнює анкету' />

            <TextInput type='text' id='username' name='username' value={username} placeholder='Ваше імя та прізвище' disabled />
          </div>
        </div>

        <div className='grid md:grid-cols-3 md:gap-6'>
          <div className='mb-6'>
            <div className='mb-2'>
              <Label htmlFor='application-type' value='Тип заявки ' />
            </div>
            <Select id='application-type' name='application-type' value={applicationType} onChange={applicationTypeHandler}>
              <option value='select'>Виберіть тип заявки</option>
              <option value='budget'>Бюджет</option>
              <option value='non-budget'>Позабюджетні кошти</option>
            </Select>
          </div>

          <div className='mb-6'>
            <div className='mb-2'>
              <Label htmlFor='companies' value=' Виберіть компанію' />
            </div>
            <Select id='companies' name='companies' value={company} onChange={companyHandler}>
              <option value='select'> Виберіть команію до якої відноситься заявка</option>
              <option value='IG'>IG</option>
              <option value='SKY'>SKY</option>
              <option value='WB'>WB</option>
            </Select>
          </div>

          <div className='mb-6'>
            <div className='mb-2'>
              <Label htmlFor='unit' value=' Виберіть відділ ' />
            </div>
            <Select id='unit' name='unit' onChange={unitHandler}>
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
            </Select>
          </div>
        </div>

        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='mb-6'>
            <div className='mb-2'>
              <Label htmlFor='place' value='Місце де заявка буде реалізована' />
            </div>
            <Select id='place' name='place' value={place} onChange={placeHandler}>
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
            </Select>
          </div>

          <div className='mb-6'>
            <div className='mb-2'>
              <Label htmlFor='type' value='Вид основного засобу' />
            </div>
            <Select id='type' name='type' value={type} onChange={typeHandler}>
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
            </Select>
          </div>
        </div>

        <div className='mb-6'>
          <div className='mb-2'>
            <Label htmlFor='application-name' value='Найменування що потрібно' />
          </div>
          <TextInput type='text' name='text' value={applicationName} onChange={applicationNameHandler} id='application-name' placeholder='Найменування позиції яка потрібна' />
        </div>

        <div className='flex items-center mb-4'>
          <Checkbox id='spare-parts' name='spare-parts' checked={spareParts} onChange={sparePartsHandler} />
          <div className='ml-2'>
            <Label htmlFor='spare-parts' value='Купівля запчастини до вже наявного основного засобу' />
          </div>
        </div>

        <div className='grid md:grid-cols-4 md:gap-6'>
          <div className='mb-6'>
            <div className='mb-2'>
              <Label htmlFor='month' value='Місяць і рік придбання' />
            </div>
            <TextInput type='month' name='month' id='month' min='2024-01' value={month} onChange={monthHandler} />
          </div>

          <div className='mb-6'>
            <div className='mb-2'>
              <Label htmlFor='count' value='Кількість' />
            </div>
            <TextInput type='number' id='count' name='count' placeholder='Введіть кількість' value={count} onChange={countHandler} />
          </div>

          <div className='mb-6'>
            <div className='mb-2'>
              <Label htmlFor='price' value=' Ціна' />
            </div>
            <TextInput type='number' id='price' name='price' value={price} onChange={priceHandler} placeholder='Введіть ціну в грн за одиницю' helperText=' Ціна за од./грн. без ПДВ' />
          </div>

          <div className='mb-6'>
            <div className='mb-2'>
              <Label htmlFor='summary' value='Разом' />
            </div>
            <TextInput type='text' id='summary' name='summary' aria-label='disabled input' placeholder='Сумма(кількість * ціна)' value={summary} disabled />
          </div>
        </div>

        <div className='mb-6'>
          <div className='mb-2'>
            <Label htmlFor='needless' value='Обґрунтування необхідності придбання (мета)' />
          </div>

          <Textarea id='needless' name='needless' value={needless} onChange={needlessHandler} placeholder='Коротко обгрунтуйте навіщо вам ця інвестиція та її потреба чи прибутковість' rows={4} />
        </div>

        <div className='mb-6'>
          <div className='mb-2'>
            <Label htmlFor='provider' value='Постачальник ' />
          </div>
          <TextInput type='text' value={provider} onChange={providerHandler} id='provider' name='provider' placeholder='Введіть назву компанії постачальника товара чи послуги' />
        </div>

        <div className='mb-6'>
          <div className='mb-2'>
            <Label htmlFor='comment' value='Коментар (наприклад: посилання на варіанти, альтернативні варіанти постачальників)' />
          </div>

          <Textarea id='comment' name='comment' value={comment} onChange={commentHandler} placeholder='Місце для коментаря' />
        </div>

        <div className='grid md:grid-cols-2 md:gap-6'>
          <Button
            color='light'
            name='onDraft'
            onClick={(event: any) => {
              onClickButton(event)
              props.setOpenModal('save-pop-up')
            }}
          >
            На затвердження
          </Button>
          <Modal show={props.openModal === 'save-pop-up'} size='md' popup onClose={() => props.setOpenModal(undefined)}>
            <Modal.Header />
            <Modal.Body>
              <div className='text-center'>
                <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>Ви впевненні що хочете зберегти заявку в чернетку?</h3>
                <div className='flex justify-center gap-4'>
                  <Button
                    color='gray'
                    onClick={() => {
                      navigate('/')
                      props.setOpenModal(undefined)
                    }}
                  >
                    Ні,не зберігати
                  </Button>
                  <Button
                    color='success'
                    onClick={() => {
                      onDispatchClick()
                      props.setOpenModal(undefined)
                    }}
                  >
                    Так,хочу зберегти
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <Button
            color='success'
            name='onSubmit'
            type='onSubmit'
            onClick={(event: any) => {
              onClickButton(event)
              props.setOpenModal('pop-up')
            }}
          >
            На затвердження
          </Button>
          <Modal show={props.openModal === 'pop-up'} size='md' popup onClose={() => props.setOpenModal(undefined)}>
            <Modal.Header />
            <Modal.Body>
              <div className='text-center'>
                <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>Ви впевненні що хочете відправити заявку на затвердження?</h3>
                <div className='flex justify-center gap-4'>
                  <Button
                    color='gray'
                    onClick={() => {
                      navigate('/')
                      props.setOpenModal(undefined)
                    }}
                  >
                    Ні,не відправляти
                  </Button>
                  <Button
                    color='success'
                    onClick={() => {
                      onDispatchClick()
                      props.setOpenModal(undefined)
                    }}
                  >
                    Так, хочу відправити
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </form>
    </>
  )
}
export default Form
