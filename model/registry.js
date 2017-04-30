module.exports = function(orm, instance) {
    return instance.define('REGISTRY', {
        ID: {
            type: orm.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        SOIL_WET: orm.STRING(45),
        PICTURE: orm.STRING(45),
        PRECIPITATION: orm.STRING(45),
        RISK_LEVEL: orm.INTEGER,
        ENTITY_ID: {
            type: orm.INTEGER,
            references: {
                model: 'ENTITY',
                key: 'ID'
            }
            // references: 'ENTITY',
            // referencesKey: 'ID'
        }
    }, {
        tableName: 'REGISTRY'
    });
};