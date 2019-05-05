const shortid = require('shortid');
var db = require('../db');
var express = require('express');
var router = express.Router();
var controller = require('./controller/user.controller');

router.get('/',controller.index);

router.get('/search', function(req, res) {
    var data = req.query.q;
    var mathUsers = db.get('users').value().filter(function(user) {
        return user.name.toLowerCase().indexOf(data.toLowerCase()) !== -1;
    });
    res.render('/users/index', {
        users: mathUsers
    });
});

router.get('/create', function(req, res) {
    res.render('users/create');
});

router.get('/:id',function(req, res){
    // Bước 1: lấy id bằng phương thức req.params (Nghĩa là lấy đoạn sau users sẽ ra được id)
    var id = req.params.id;
    // Bước 2: Tìm users bằng phương thức find của lowdb
    var user = db.get('users').find({id:id}).value();

    res.render('users/view',{
        user:user
    })
});

router.post('/create', function(req, res) {
    req.body.id= shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});
module.exports = router;