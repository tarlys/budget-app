import { downloadExcel } from 'react-export-table-to-excel'

const excelDownload = (tickets: []) => {
  console.log(tickets)

  const header = ['Стаття витрат', 'Назва статті ', 'Оргструктура', 'Січень', 'Березень', 'Квітень', 'Лютий', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень', 'Сумма', 'Найменування', 'Кількість']
  // const body = [
  //   ['Edison', 'Padilla', 14],
  //   ['Cheila', 'Rodrigez', 56],
  // ]

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

    const ticketType = (type: string) => {
      // const typeMap: { [key: string]: string } = {
      //   'home-tech': 'Побутова техніка',
      //   'lab-equipment': 'Лабораторне обладнання',
      //   'storage-equipment': 'Складське обладнання',
      //   'labor-protection-equipment': 'Засоби охорона праці',
      //   'it-equipment': 'IT-техніка',
      //   furniture: 'Меблі',
      //   cars: 'Автомобілі',
      //   tools: 'Інструменти',
      //   'sequrity-equipment': 'Засоби служба безпеки',
      //   software: 'Програмне забезпечення',
      //   'another-equipment': 'Інші основні засоби',
      //   repairment: 'Ремонт приміщення',
      // }
      const typeMap: { [key: string]: string } = {
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

      const translatedType = typeMap[type] || 'Неизвестный статус'

      return translatedType
    }

    //add structure name
    newTicket.push(ticketType(ticket.unit))

    // add month summary
    for (let index = 0; index < 12; index++) {
      const monthFromDate = Number(ticket.month.slice(-2))
      if (monthFromDate === index) {
        newTicket.push(ticket.summary)
      } else {
        newTicket.push('0')
      }
      console.log(monthFromDate)
    }

    // Add summary
    newTicket.push(ticket.summary)
    //add ticket name
    newTicket.push(ticket.applicationName)
    //add ticket count
    newTicket.push(ticket.count)

    console.log(newTicket)
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

export default excelDownload
