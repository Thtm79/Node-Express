module.exports.postCreate = function(req , res , next){
	var errors = [];
	if(!req.body.name){
		errors.push('Vui long nhap ten');
	}
	if(!req.body.phone){
		errors.push('Vui long nhap sdt');
	}

	if(errors.length){
		res.render('users/create',{
			errors:errors,
			values:req.body
		});
		return;
	}
	next();
};