module.exports = function(orm, instance) {
    return instance.define('ENTITY_SENSOR', {     
        ID: {
            type: orm.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },   
        ENTITY_ID: {
            type: orm.INTEGER,
            references: {
                model: 'ENTITY',
                key: 'ID'
            }
        },
        SENSOR_ID: {
            type: orm.INTEGER,
            references: {
                model: 'SENSOR',
                key: 'ID'
            }
        },
        LATITUDE: orm.STRING(45),
        LONGITUDE: orm.STRING(45)
    }, {
        id: false,
        tableName: 'ENTITY_SENSOR',
        createdAt: false,
        updatedAt: false
    });
};