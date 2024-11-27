// MVC --> Model , View , Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let jewelleryModel = mongoose.Schema({
    product:String,
    category:String,
    price:String,
    color:String,
    metal:String,
    size:String

},
{
    collection:"Bio_jewellery"
}
)
module.exports = mongoose.model('Jewellery',jewelleryModel)