import { Link } from 'react-router-dom'
import { Table } from 'flowbite-react'

function ApplicationItem(ticket: any) {
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
    <Table.Row>
      <Table.Cell>{ticket.ticket.applicationName}</Table.Cell>
      <Table.Cell>{ticket.ticket.applicationId}</Table.Cell>
      <Table.Cell>{ticketStatus(ticket.ticket.status)}</Table.Cell>
      <Table.Cell>{ticket.ticket.summary}</Table.Cell>
      <Table.Cell>{ticket.ticket.username}</Table.Cell>
      <Table.Cell>
        <Link to={`/form/${ticket.ticket._id}`} className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
          Перегляд
        </Link>
      </Table.Cell>
    </Table.Row>
  )
}
export default ApplicationItem
