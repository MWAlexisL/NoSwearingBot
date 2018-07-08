const models = require('../models');

module.exports.help = {
    name: "confirm"
};

module.exports.run = (sequelize, message, args) => {
    models.User.findAll({
        where: {
            userId: message.member.id
        }
    }).then(res => {
        if (res.length === 0) {
            models.User.create({
                userId: message.member.id
            });
        }
    });

};
