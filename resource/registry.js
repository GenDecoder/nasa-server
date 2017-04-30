module.exports = function(model, router) {
    router.get('/registry/list', function(req, res) {
        
    });
    router.post('/registry/create', function(req, res) {
        model.create({ 
            SOIL_WET: orm.STRING(45),
            PICTURE: orm.STRING(45),
            PRECIPITATION: orm.STRING(45),
            RISK_LEVEL: orm.INTEGER
        }).then(function(response) {
            res.json({
                success: true,
                object: response.dataValues
            });
        });
    });    
    router.post('/registry/update', function(req, res) {
       
    });
    router.post('/registry/getById', function(req, res) {
        
    });
};