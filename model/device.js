module.exports = function(orm, instance) {
    return instance.define('DEVICE', {
        ID: {
            type: orm.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        NAME: orm.STRING(45)           
    }, {
        tableName: 'DEVICE',
        createdAt: false,
        updatedAt: false
    });
};