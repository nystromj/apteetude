var mongoose = require('mongoose')
  , Schema = mongoose.Schema

/** field object to access data and populate design templates **/
var FieldSchema = new Schema({
  info: { type: String, default: '' }, // field categy: "age", "location", etc.
  access_field: { type: String, default: '' }, // string that points to data in User object (ex: User.facebook.username)
  associations: { type: String, default: '' } // to store json object of associations. [Grinnell College] => "Grinnellians" for college Field
})

mongoose.model('Field', FieldSchema);
