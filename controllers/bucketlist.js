//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const bucketlist = require('../models/list');

//GET HTTP method to /bucketlist
router.get('/',(req,res) => {
    bucketlist.getAllLists((err, lists) => {
        let data = {};
        if (err || null) {
            data['error'] = err;
            data['status'] = 400;
        } else {
            data['data'] = lists;
            data['status'] = 200;
        }
    
        res.json(data);
    })
});

//POST HTTP method to /bucketlist

router.post('/', (req,res,next) => {
    let newList = new bucketlist({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        //How the fuck do i add my array of items to a list???
        items: [req.body.items]
    });
    bucketlist.addList(newList,(err, list) => {
        let data = {};
        if (err || null) {
            data['error'] = err;
            data['status'] = 400;
        } else {
            data['data'] = list;
            data['status'] = 200;
        }
    
        res.json(data);

    });
});

//DELETE HTTP method to /bucketlist. Here, we pass in a param which is the object id.

router.delete('/:id', (req,res,next)=> {
    //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
    //Call the model method deleteListById
    bucketlist.deleteListById(id,(err,list) => {
        let data = {};
        if (err || null) {
            data['error'] = err;
            data['status'] = 400;
        } else {
            data['data'] = list;
            data['status'] = 200;
        }
    
        res.json(data);
    })
});

module.exports = router;