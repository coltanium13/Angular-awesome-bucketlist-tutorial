//Require mongoose package
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
//mongoose.Promise = require('bluebird');
//Define BucketlistSchema with title, description and category

var itemSchema = Schema({
    text: String
});

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
    items: [itemSchema]
});



const List = mongoose.model('List', listSchema, 'lists');
//const Item = mongoose.model('Item', itemSchema, 'items');
module.exports = List;

//const BucketList = module.exports = List;
//const Item= module.exports = mongoose.model('Item', itemSchema);

//BucketList.find() returns all the lists
module.exports.getAllLists = (callback) => {
    List.find(callback).then(console.log("get all lists"));
        /*.populate('items.text')
        .exec(callback);*/
}


//newList.save is used to insert the document into MongoDB
module.exports.addList = (newList, callback) => {
    newList.save(callback);
}

module.exports.updateList = (listToUpdate, callback) => {
    console.log('Model updateListTitle: '+ listToUpdate._id);
    /*var newValues = {$set: {
        title: listToUpdate.title,
            description: listToUpdate.description,
            category: listToUpdate.category,
            items: listToUpdate.items
        }};*/
    console.log('model newValues: ' + JSON.stringify(listToUpdate));
    var newValues = {$set: {listToUpdate}};
    //console.log('newValues: ' + JSON.stringify(newValues));
    List.update({_id: listToUpdate._id}, {items: listToUpdate.items}, callback);
}

//We pass on an id and remove it from DB using Bucketlist.remove()
module.exports.deleteListById = (id, callback) => {
    let query = {_id: id};
    List.remove(query, callback);
}

module.exports.addListItemById = (listId, newItem, callback) => {
    console.log(listId + 'item Model:' + newItem);
    let query = {_id: listId,
                 $push: {items: newItem}};
    List.update(query, callback).then(console.log("add new item"));
}