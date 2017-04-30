module.exports = function(model, router) {
    router.get('/entity/list', function(req, res) {
        model.findAll().then(function(data) {
            console.log(data);
            res.json({
                success: true,
                list: data
            });
        }, function(error) {
            console.log(error);
        });
    });
    router.post('/entity/create', function(req, res) {    
        model.create({
            NAME: req.body.name
        }).then(function(response) {
            console.log(response);
            res.json({
                success: true,
                object: response.dataValues
            })
        });
    });
    router.post('/entity/remove', function(req, res) {
        
    });
    router.post('/entity/update', function(req, res) {
       
    });
    router.post('/entity/getById', function(req, res) {
        
    });
};