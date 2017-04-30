module.exports = function(orm, instance) {
    return instance.define('IMERG', {
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
        ALARMS_ON: orm.BOOLEAN,
        ENTITY_ID: {
            type: orm.INTEGER,
            references: {
                model: 'ENTITY',
                key: 'ID'
            }
        },
    }, {
        tableName: 'IMERG',
        createdAt: false,
        updatedAt: false
    });
};