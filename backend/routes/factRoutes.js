const express = require('express')
const router = express.Router({ mergeParams: true })

const { getFacts, createFact } = require('../controllers/factController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getFacts).post(protect, createFact)

module.exports = router
