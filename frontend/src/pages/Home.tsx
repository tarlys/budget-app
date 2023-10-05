import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserTickets, getAllTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import ApplicationItem from '../components/ApplicationItem'
import excelDownload from '../features/excel-download/excelDownload'
import excelDownloadAll from '../features/excel-download/excelDownloadAll'

function Home() {
  const { user } = useSelector((state: any) => state.auth)
  const [allButtonEnabled, setAllButtonEnabled] = useState(false)
  const { tickets, isLoading, isSuccess } = useSelector((state: any) => state.ticket)

  const dispatch = useDispatch()
  const tableRef = useRef(null)

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

      <table ref={tableRef} className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Найменування заявки
            </th>
            <th scope='col' className='px-6 py-3'>
              <div className='flex items-center'>
                id заявки
                <a href='#'>
                  <svg className='w-3 h-3 ml-1.5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z' />
                  </svg>
                </a>
              </div>
            </th>
            <th scope='col' className='px-6 py-3'>
              <div className='flex items-center'>
                Статус заявки
                <a href='#'>
                  <svg className='w-3 h-3 ml-1.5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z' />
                  </svg>
                </a>
              </div>
            </th>
            <th scope='col' className='px-6 py-3'>
              <div className='flex items-center'>
                Сумма
                <a href='#'>
                  <svg className='w-3 h-3 ml-1.5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z' />
                  </svg>
                </a>
              </div>
            </th>
            <th scope='col' className='px-6 py-3'>
              <span className='sr-only'>Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket: any) => (
            <ApplicationItem key={ticket._id} ticket={ticket} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Home
