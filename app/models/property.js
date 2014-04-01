var mongoose = require('mongoose')
  , Schema = mongoose.Schema

/** field object to access data and populate design templates **/
var PropertySchema = new Schema({
  info: { type: String, default: '' }, // field categy: "age", "location", etc.
  name: String,
  facebook_page: Number,
  network: String, 
  meta: {},
  details: {}, 
  created: { type: Date, default: Date.now }, 
  user: { type: Schema.ObjectId, ref: 'User' }
})

mongoose.model('Property', PropertySchema, 'properties'); 