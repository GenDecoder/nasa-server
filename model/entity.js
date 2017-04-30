module.exports = function(orm, instance) {
    return instance.define('ENTITY', {
        ID: {
            type: orm.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        NAME: orm.STRING(45),
        LATITUDE: orm.STRING(45),
        LONGITUDE: orm.STRING(45),
        SOIL_TYPE: orm.STRING(45),
        ALARMS_ON: orm.BOOLEAN
    }, {
        tableName: 'ENTITY',
        createdAt: false,
        updatedAt: false
    });
};