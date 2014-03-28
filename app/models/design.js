var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  
 
/* Design templates for the text displayed on each product */
var DesignSchema = new Schema({
  name: { type: String, default: '', trim: true }, // name of the design, if necessary
  design: { type: String, default: '' }, // html string to display template for design
  field_ids: [String], // name of each property id in html template
  associated_fields: [{ type: Schema.ObjectId, ref: 'Field' }], // field models that can replace each propery id in final design
  creator: { type: Schema.ObjectId, ref: 'User' }, // created by
  created: { type: Date, default: Date.now }, // date created
  impressions: { type: Number, default: 0 }, // number of impressions
  clicks: { type: Number, default: 0 } // number of clickthroughs
})

mongoose.model('Design', DesignSchema, 'designs');
