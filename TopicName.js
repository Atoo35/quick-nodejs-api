const mongoose = require('mongoose')

const topicBody = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  delimiter: {
    type: String,
    required: true,
  },
  cat: {
    type: String,
    required: true,
  }
})

const TopicSchema = new mongoose.Schema({
  topicName: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    default:0,
  },
  topicBody: [{
    type: topicBody,
    required: true,
  }]
})

const Topic = mongoose.model('TopicName', TopicSchema)

module.exports = Topic