//Require mongoose package
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
//mongoose.Promise = require('bluebird');
//Define BucketlistSchema with title, description and category
var listSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: String,
        required: true,
        enum: ['High', 'Medium', 'Low']
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

var itemSchema = Schema({
    text: String
});

const List = mongoose.model('List', listSchema, 'lists');
const Item = mongoose.model('Item', itemSchema, 'items');
module.exports = {
    List, Item,
}

//const BucketList = module.exports = List;
//const Item= module.exports = mongoose.model('Item', itemSchema);

//BucketList.find() returns all the lists
module.exports.getAllLists = (callback) => {
    List.find(callback).populate('items');
}


//newList.save is used to insert the document into MongoDB
module.exports.addList = (newList, callback) => {
    newList.save(callback);
}


//We pass on an id and remove it from DB using Bucketlist.remove()
module.exports.deleteListById = (id, callback) => {
    let query = {_id: id};
    List.remove(query, callback);
}