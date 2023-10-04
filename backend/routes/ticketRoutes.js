const express = require('express')
const router = express.Router()
const { getUserTickets, getAllTickets, getTicket, createTicket, deleteTicket, updateTicket } = require('../controllers/ticketController')

const { protect } = require('../middleware/authMiddleware')

router.route('/all/:status').get(protect, getAllTickets)
router.route('/').get(protect, getUserTickets).post(protect, createTicket)
router.route('/:id').get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket)

module.exports = router
