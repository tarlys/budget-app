import { downloadExcel } from 'react-export-table-to-excel'

const excelDownloadAll = (tickets: []) => {
  console.log(tickets)

  const header = ['Стаття витрат', 'Назва статті ', 'Дата заповнення анкети', 'ПІБ того хто заповнює анкету', 'Тип заявки', 'Компанія', 'Відділ', 'Місце де заявка буде реалізована', 'Вид основного засобу', 'Найменування що потрібно', 'Купівля запчастини до вже наявного основного засобу', 'Місяць і рік придбання', 'Кількість', 'Ціна', 'Разом', 'Обґрунтування необхідності придбання', 'Постачальник', 'Коментар', 'Статус']

  // let { price, count, id, date, username, applicationType, company, unit, place, type, applicationName, spareParts, month, needless, provider, comment, time, status, summary } = tickets[0]

  const body: any = []

  tickets.map((ticket: any) => {
    // body.push(ticket)
    let newTicket: string[] = []
    //Add code of ticket
    if (ticket.spareParts === true) {
      newTicket.push('153200')
      newTicket.push('Виготовл. І модерн ОЗ (вартістю менше 6,0 тис.грн)')
    } else if (ticket.summary > 20000) {
      newTicket.push('152100')
      newTicket.push('Придбання осн.засоб (вартістю більше 6,0 тис.грн)')
    } else if (ticket.summary < 20000) {
      newTicket.push('153100')
      newTicket.push('Придбання осн.засоб (вартістю менше 6,0 тис.грн)')
    } else if (ticket.type === 'software') {
      newTicket.push('154100')
      newTicket.push('Придбання нематер. Актив.')
    } else if (ticket.type === 'repairment') {
      newTicket.push('925450')
      newTicket.push('Ремонт орен. примішення')
    }
    newTicket.push(ticket.date)
    newTicket.push(ticket.username)

    const ticketUnit = (unit: string) => {
      const unitMap: { [key: string]: string } = {
        select: 'Виберіть відділ до якого відноситься заявка',
        company: 'Компанія',
        direction: 'Дирекція',
        admin: 'Адміністративно-господарчий відділ',
        financial: 'Фінансовий відділ',
        security: 'Відділ Безпеки',
        control: 'Контрольно-ревізійний відділ',
        lawyer: 'Юридичний відділ',
        'foreign-economic': 'Відділ ЗЕД',
        marketing: 'Відділ маркетингу',
        'business-dev-app': 'Відділ Розробки Бізнес-Додатків',
        it: 'Відділ інформаційних технологій',
        hr: 'Відділ HR',
        client: 'Відділ по роботі з клієнтами',
        storage: 'Склад',
        'tech-support': 'Відділ технічної підтримки',
        'lubricants-lab': 'Лабораторія мастильних матеріалів',
        'industrial-equipment': 'Відділ промислового обладнання',
        b2b: 'Комерційний відділ B2B',
        transport: 'Відділ Транспорт',
        industrial: 'Відділ Промисловість',
        agriculture: 'Відділ Сільське господарство',
        industry: 'Відділ Індустрія',
        b2c: 'Комерційний відділ B2C',
        'pcmo-acto': 'Відділ PCMO АСТО',
        'pcmo-retail': 'Відділ PCMO Роздріб',
        'internet-sales': 'Відділ інтернет продажів',
      }

      const translatedType = unitMap[unit] || 'Неизвестный статус'

      return translatedType
    }

    const ticketType = (type: string) => {
      const typeMap: { [key: string]: string } = {
        'home-tech': 'Побутова техніка',
        'lab-equipment': 'Лабораторне обладнання',
        'storage-equipment': 'Складське обладнання',
        'labor-protection-equipment': 'Засоби охорона праці',
        'it-equipment': 'IT-техніка',
        furniture: 'Меблі',
        cars: 'Автомобілі',
        tools: 'Інструменти',
        'sequrity-equipment': 'Засоби служба безпеки',
        software: 'Програмне забезпечення',
        'another-equipment': 'Інші основні засоби',
        repairment: 'Ремонт приміщення',
      }

      const translatedType = typeMap[type] || 'Неизвестный статус'

      return translatedType
    }
    //Add application type
    newTicket.push(ticket.applicationType)

    newTicket.push(ticket.company)
    newTicket.push(ticketUnit(ticket.unit))
    newTicket.push(ticket.place)
    newTicket.push(ticketType(ticket.type))
    //add structure name

    //add ticket name
    newTicket.push(ticket.applicationName)
    newTicket.push(ticket.spareParts)
    newTicket.push(ticket.month)
    newTicket.push(ticket.count)
    newTicket.push(ticket.price)
    newTicket.push(ticket.summary)
    newTicket.push(ticket.needless)
    newTicket.push(ticket.provider)
    newTicket.push(ticket.comment)
    newTicket.push(ticket.status)

    body.push(newTicket)
  })
  console.log(body)

  /**
   * @description:
   *  also accepts an array of objects; the method (downloadExcel) will take
   *  as order of each column, the order that each property of the object brings with it.
   *  the method(downloadExcel) will only take the value of each property.
   */
  // const body = [
  //   { firstname: 'Edison', lastname: 'Padilla', age: 14 },
  //   { firstname: 'Cheila', lastname: 'Rodrigez', age: 56 },
  // ]

  downloadExcel({
    fileName: 'react-export-table-to-excel -> downloadExcel method',
    sheet: 'react-export-table-to-excel',
    tablePayload: {
      header,
      // accept two different data structures
      body: body,
    },
  })
}

export default excelDownloadAll
