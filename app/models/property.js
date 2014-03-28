var mongoose = require('mongoose')
  , Schema = mongoose.Schema

/** field object to access data and populate design templates **/
var PropertySchema = new Schema({
  info: { type: String, default: '' }, // field categy: "age", "location", etc.
  name: String,
  network: String, 
  details: {}, 
  created: { type: Date, default: Date.now }, 
  user: { type: Schema.ObjectId, ref: 'User' }
})

mongoose.model('Property', PropertySchema, 'properties'); 

// state
// city
// country
// college
// movies
// books
// activities
// shows
// name
// age
// high school
// company
// music

// extend all children schema.
// should also include a pointer back to popular designs....

// add likely fields class to users... 