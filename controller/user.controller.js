var db = require('../db');
const shortid = require('shortid');
module.exports.index = function(req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
};

module.exports.search = function(req, res) {
    var data = req.query.q;
    var mathUsers = db.get('users').value().filter(function(user) {
        return user.name.toLowerCase().indexOf(data.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: mathUsers
    });
};

module.exports.create = function(req, res) {
    res.render('users/create');
};

module.exports.getID = function(req, res){
    // Bước 1: lấy id bằng phương thức req.params (Nghĩa là lấy đoạn sau users sẽ ra được id)
    var id = req.params.id;
    // Bước 2: Tìm users bằng phương thức find của lowdb
    var user = db.get('users').find({id:id}).value();

    res.render('users/view',{
        user:user
    })
};

module.exports.postCreate = function(req, res) {
    req.body.id= shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
};

