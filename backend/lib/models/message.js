
// modele class MESSAGE pour la base de données.

const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    class Message extends Model {}
    Message.init({
            idUSERS: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            title: {
                allowNull: false,
                type: DataTypes.STRING
            },
            content: {
                allowNull: false,
                type: DataTypes.STRING
            },
            attachment: {
                allowNull: true,
                type: DataTypes.STRING
            },
            likes: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {
            sequelize,
            modelName: "Message"
        })
    return Message
}