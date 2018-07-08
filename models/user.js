'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId: DataTypes.STRING,
        selected: DataTypes.BOOLEAN
    }, {});
    User.associate = function (models) {
        // associations can be defined here
    };
    return User;
};
