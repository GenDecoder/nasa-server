module.exports = function(model, router) {
    router.get('/sensor/list', function(req, res) {
        
    });
    router.post('/sensor/create', function(req, res) {
            model.create({
                NAME: req.body.name
            }).then(function(response) {
                res.json({
                    success: true,
                    object: response.dataValues
                });
            });
    });
    router.post('/sensor/remove', function(req, res) {
        
    });
    router.post('/sensor/update', function(req, res) {
       
    });
    router.post('/sensor/getById', function(req, res) {
        
    });
};