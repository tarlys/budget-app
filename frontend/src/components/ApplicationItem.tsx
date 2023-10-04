import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ApplicationItem(ticket: any) {
  const { user } = useSelector((state: any) => state.auth)

  const ticketStatus = (status: string) => {
    const statusMap: { [key: string]: string } = {
      onDraft: 'Чернетка',
      onSubmit: 'На затвердження',
      submitted: 'Затвердженно',
      decline: 'Заявка відхилена',
      return: 'Поверненно на допрацювання',
    }

    const translatedStatus = statusMap[status] || 'Нeвiдомий статус'

    return translatedStatus
  }
  return (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
      <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
        {ticket.ticket.applicationName}
      </th>
      <td className='px-6 py-4'>{ticket.ticket.applicationId}</td>
      <td className='px-6 py-4'>{ticketStatus(ticket.ticket.status)}</td>
      <td className='px-6 py-4'>{ticket.ticket.summary}</td>
      <td className='px-6 py-4'>{ticket.ticket.username}</td>
      <td className='px-6 py-4 text-right'>
        <Link to={`/form/${ticket.ticket._id}`} className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
          Перегляд
        </Link>
      </td>

      {/* {user.isAdmin === false && (
        <>
          <td className='px-6 py-4 text-right'>
            <Link to={`/form/${ticket.ticket._id}`} className='font-medium text-green-600 dark:text-green-500 hover:underline'>
              Затвердити
            </Link>
          </td>
          <td className='px-6 py-4 text-right'>
            <Link to={`/form/${ticket.ticket._id}`} className='font-medium text-yellow-600 dark:text-yellow-500 hover:underline'>
              Допрацювати
            </Link>
          </td>
          <td className='px-6 py-4 text-right'>
            <Link to={`/form/${ticket.ticket._id}`} className='font-medium text-red-600 dark:text-red-500 hover:underline'>
              Відхилити
            </Link>
          </td>
        </>
      )} */}
    </tr>
  )
}
export default ApplicationItem
