var mongoose = require('mongoose')
  , Schema = mongoose.Schema

/* store information for each clothing type */
var TextileSchema = new Schema({
  name: { type: String, default: '' }, // name of style (ex: Men's T-Shirt, Tote Bag, Trucker hat)
  onesize: Boolean, // are there multiple sizes for this item?
  sizes: [String],  // available sizes (S, M, L)
  onecolor: Boolean, // are there multiple colors available for this item?
  colors: [String],  // colors available (ex: red, orange, etc.)
  price: Number, // regular price 
  sale: Boolean, // is the object on sale?
  sale_price: Number, // price when on sale
  cost: Number, // how much to produce item
  in_stock: { type: Number, default: 0}, // number of item left in stock
  sex: String, // sex of item (male, female or unisex)
  imgurl: String, // url to generate image from
  impressions: { type: Number, default: 0 }, // number of impressions for this product
  clicks: { type: Number, default: 0 }, // number of clicks for this product
  style-fields: {}, // css fields for styling texts
})

mongoose.model('Textile', TextileSchema);
