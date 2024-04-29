const mongoose = require('mongoose')

const factSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Ticket',
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
      type: String,
      required: [true, 'Please add application type'],
      enum: ['budget', 'non-budget'],
    },
    company: {
      type: String,
      required: [true, 'Please add company'],
      enum: ['IG', 'SKY', 'WB'],
    },
    username: {
      type: String,
      required: [true, 'Please add company'],
    },
    unit: {
      type: String,
      required: [true, 'Please add unit'],
      enum: ['company', 'direction', 'admin', 'financial', 'security', 'control', 'lawyer', 'foreign-economic', 'marketing', 'business-dev-app', 'it', 'hr', 'client', 'storage', 'tech-support', 'lubricants-lab', 'industrial-equipment', 'b2b', 'transport', 'industrial', 'agriculture', 'industry', 'b2c', 'pcmo-acto', 'pcmo-retail', 'internet-sales'],
    },
    place: {
      type: String,
      required: [true, 'Please add place'],
      enum: ['kyiv-sverstyka', 'brovary-zaliznychna', 'brovary-moskalenka', 'dnipro-archive', 'dnipro-laboratory', 'dnipro-oil-cleaning', 'dnipro-office', 'dnipro-storage', 'dnipro-lamana', 'dnipro-sichvyh', 'dnipro-grushevskogo', 'kyiv-chervonotkatska', 'lviv-gorodockogo', 'lviv-persenkyva', 'odessa-storage-ysativska', 'khmelnytskyi-storage', 'exclusion'],
    },
    applicationId: {
      type: String,
      required: [true, 'Please add applicationId'],
    },
    date: {
      type: String,
      required: [true, 'Please add date'],
    },
    time: {
      type: String,
      required: [true, 'Please add time'],
    },
    type: {
      type: String,
      required: [true, 'Please add type'],
      enum: ['home-tech', 'lab-equipment', 'storage-equipment', 'labor-protection-equipment', 'it-equipment', 'furniture', 'cars', 'tools', 'sequrity-equipment', 'software', 'another-equipment', 'repairment'],
    },
    applicationName: {
      type: String,
      required: [true, 'Please add application type'],
    },
    spareParts: {
      type: Boolean,
      required: [true, 'Please add spare parts'],
      default: false,
    },
    month: {
      type: String,
      required: [true, 'Please add month'],
    },
    needless: {
      type: String,
      required: [true, 'Please add needless'],
    },
    provider: {
      type: String,
      required: [true, 'Please add provider'],
    },
    comment: {
      type: String,
      required: [true, 'Please add comment'],
    },
    status: {
      type: String,
      required: [true, 'Please add status'],
      enum: ['onDraft', 'onSubmit', 'submitted', 'decline', 'return'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Fact', factSchema)
