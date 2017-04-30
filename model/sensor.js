module.exports = function(orm, instance) {
    return instance.define('SENSOR', {
        ID: {
            type: orm.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        NAME: orm.STRING(45)           
    }, {
        tableName: 'SENSOR',
        createdAt: false,
        updatedAt: false
    });
};