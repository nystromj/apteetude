var mongoose = require('mongoose')
  , Schema = mongoose.Schema

/** a product is a combination of a design and a textile that we use to populate the store pages */
var ProductSchema = new Schema({
  design: { type: Schema.ObjectId, ref: 'Design' }, // the design text to display
  fields: { type: String, ref: 'Field', default: design.fields[0] }, // which fields to display for user
  textile: { type: Schema.ObjectId, ref: 'Textile' }, // which textile to use
  style: { type: String, ref: 'Textile', default: textile.style } // CSS object for style
})

mongoose.model('Product', ProductSchema);
