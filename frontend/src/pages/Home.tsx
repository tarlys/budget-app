import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserTickets, getAllTickets, reset } from '../features/tickets/ticketSlice'
import { Button, Table } from 'flowbite-react'
import Spinner from '../components/Spinner'
import ApplicationItem from '../components/ApplicationItem'
import excelDownload from '../features/excel-download/excelDownload'
import excelDownloadAll from '../features/excel-download/excelDownloadAll'

function Home() {
  const { user } = useSelector((state: any) => state.auth)
  const [allButtonEnabled, setAllButtonEnabled] = useState(false)
  const { tickets, isLoading, isSuccess } = useSelector((state: any) => state.ticket)

  const dispatch = useDispatch()
  // const tableRef = useRef(null)

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    if (user?.isAdmin) {
      dispatch(getAllTickets('onSubmit'))
    } else {
      dispatch(getUserTickets())
    }
  }, [dispatch, user])

  const showTicketsHandler = (event: any) => {
    event.preventDefault()
    dispatch(getAllTickets(event.target.name))

    if (event.target.name === 'all') {
      setAllButtonEnabled(true)
    } else {
      setAllButtonEnabled(false)
    }
    console.log(allButtonEnabled)
  }

  const onExcelDownload = (event: any) => {
    event.preventDefault()
    excelDownload(tickets)
  }
  const onExcelDownloadAll = (event: any) => {
    event.preventDefault()
    excelDownloadAll(tickets)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='relative shadow-md sm:rounded-lg'>
      {user?.isAdmin && (
        <>
          <div className='grid gap-6 mb-6 md:grid-cols-5'>
            <button type='button' name='onSubmit' onClick={showTicketsHandler} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
              На затвердження
            </button>

            <button type='button' name='submitted' onClick={showTicketsHandler} className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
              Затверджені
            </button>

            <button type='button' name='return' onClick={showTicketsHandler} className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900'>
              На допрацювання
            </button>

            <button type='button' name='decline' onClick={showTicketsHandler} className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
              Відхилені
            </button>

            <button type='button' name='all' onClick={showTicketsHandler} className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'>
              Всі заявки
            </button>
          </div>
          <div className='grid gap-6 mb-6 md:grid-cols-2'>
            <button type='button' onClick={onExcelDownload} className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' disabled={false}>
              Завантажити excel(форма Інветицій)
            </button>
            <button type='button' disabled={!allButtonEnabled} onClick={onExcelDownloadAll} className={!allButtonEnabled ? 'py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700' : 'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'}>
              Завантажити excel(всі данні)
            </button>
          </div>
        </>
      )}

      <Table>
        <Table.Head>
          <Table.HeadCell>Найменування заявки</Table.HeadCell>
          <Table.HeadCell>id заявки</Table.HeadCell>
          <Table.HeadCell>Статус заявки</Table.HeadCell>
          <Table.HeadCell>Сумма</Table.HeadCell>
          <Table.HeadCell>Автор</Table.HeadCell>
          <Table.HeadCell>Редагування</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {tickets.map((ticket: any) => (
            <ApplicationItem key={ticket._id} ticket={ticket} />
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
export default Home
