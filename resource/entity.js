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
            NAME: req.body.name,
            LATITUDE: req.body.latitude,
            LONGITUDE: req.body.longitude,
            SOIL_TYPE: req.body.soil_type
        }).then(function(response) {
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
    router.get('/entity/getById', function(req, res) {
        model.find({
            ID: req.query.id            
        }).then(function(response) {
            res.json({
                success: true,
                object: response.dataValues
            })
        });
    });
};