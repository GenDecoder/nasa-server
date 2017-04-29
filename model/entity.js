module.exports = function(orm, instance) {
    return instance.define('ENTITY', {
        id: {
            type: orm.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: orm.STRING(45)           
    }, {
        tableName: 'ENTITY'            
    });
};