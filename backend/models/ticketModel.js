const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    count: {
      type: Number,
      required: [true, 'Please add a count'],
    },
    summary: {
      type: Number,
      required: [true, 'Please add summary'],
    },
    applicationType: {
      type: Boolean,
      required: [true, 'Please add summary'],
      enum: ['Бюджет', 'Позабюджетні кошти', 'Three'],
    },
    company: {
      type: Boolean,
      required: [true, 'Please add summary'],
      default: false,
    },
    unit: {
      type: Boolean,
      required: [true, 'Please add summary'],
      default: false,
    },
    place: {
      type: Map,
      of: String,
    },
    type: {
      type: Boolean,
      required: [true, 'Please add summary'],
      default: false,
    },
    applicationName: {
      type: Boolean,
      required: [true, 'Please add summary'],
      default: false,
    },
    spareParts: {
      type: Boolean,
      required: [true, 'Please add summary'],
      default: false,
    },
    month: {
      type: Boolean,
      required: [true, 'Please add summary'],
      default: false,
    },
    needless: {
      type: Boolean,
      required: [true, 'Please add summary'],
      default: false,
    },
    provider: {
      type: Boolean,
      required: [true, 'Please add summary'],
      default: false,
    },
    comment: {
      type: Boolean,
      required: [true, 'Please add summary'],
      default: false,
    },
    status: {
      type: Boolean,
      required: [true, 'Please add summary'],
      enum: ['onDraft', 'onSubmit', 'submitted', 'onDelete'],
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Ticket', ticketSchema)
