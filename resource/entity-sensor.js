module.exports = function(model, router) {    
    router.post('/entity-sensor/create', function(req, res) {
        model.create({
            ENTITY_ID: req.body.entityId,
            SENSOR_ID: req.body.sensorId,
            LATITUDE: req.body.latitude,
            LONGITUDE: req.body.longitude
        }).then(function(response) {
            res.json({
                success: true,
                object: response.dataValues
            })
        });
    }); 

    router.get('/entity-sensor/list', function(req, res) {
        model.findAll({
            ENTITY_ID: req.query.id            
        }).then(function(list) {
            res.json({
                success: true,
                list: list
            })
        });
    });    
};