const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {}

    Comment.init({
            comment: {
                type: DataTypes.STRING
            },
            userId: {
                type: DataTypes.INTEGER
            },
            userName: {
                type: DataTypes.STRING
            },
            postId: {
                type: DataTypes.INTEGER
            },
        },
        {
            sequelize,
            modelName: "Comment"
        })
    return Comment
}