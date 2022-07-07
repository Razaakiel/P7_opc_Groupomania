const db = require("../lib/models")
const Message   = db.Message
const User      = db.User
const Comment   = db.Comment


// Routes CRUD : Create, Read, Update, Delete.

// CREATE

exports.createMessage = (req, res) => {
    const post = new Message({
        idUSERS: req.body.idUSERS,
        title: req.body.title,
        content: req.body.content,
        attachment: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
        likes:0,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    console.log('save', post)
    post.save()
        .then(() => res.status(201).json({ message: 'Post créé avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de créer ce post', error }));
}

// READ
exports.findAllMessages = async (req, res, next) => {
    Message.findAll({
        order: [["id", "DESC"]],
    })
        .then(async messages => {
            let listTmp = [];
            for (const message of messages) {
                let msgTmp = message.dataValues
                await User.findOne({where: {id: message.dataValues.idUSERS}}).then(user => {
                    msgTmp.user = user.dataValues;
                    listTmp.push(msgTmp);
                });
            }
            res.status(200).json({listTmp});
        })
        .catch(error => res.status(500).json({ error }))
}

exports.findOneMessage = (req, res, next) => {
    const oneMessage = {}
    Message.findOne({where: { id: req.params.id }}).then(message => {
            oneMessage.id           = message.dataValues.id
            oneMessage.userId       = message.dataValues.userId
            oneMessage.idUSERS      = message.dataValues.idUSERS
            oneMessage.title        = message.dataValues.title
            oneMessage.content      = message.dataValues.content
            oneMessage.attachment   = message.dataValues.attachment
            oneMessage.likes        = message.dataValues.likes
            oneMessage.createdAt    = message.dataValues.createdAt
            oneMessage.updatedAt    = message.dataValues.updatedAt
            res.status(200).json(oneMessage)
        })
        .catch(error => res.status(500).json({ error }))
};

exports.findAllMessagesForOne = (req, res, next) => {
    let list = ""
    Message.findAll({
        where: { UserId: req.params.id },
    })
        .then((res) => {
            list = res;
            res.status(200).json( { list } )
        })
        .catch((error) => { res.status(404).json({ error })})
};

// Modifier un post
exports.modifyPost = (req, res) => {
    const id = req.params.id;
    const userId = req.body.userId

    let updatedPost = {
        title: req.body.title,
        content: req.body.content,
        updatedAt: new Date(),
    }
    if (req.file) {
        updatedPost["imageUrl"] = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }

    Message.update(updatedPost, { where: { id: id, idUSERS: userId }})
        .then(() => res.status(200).json({ message: 'Post modifié avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de modifier ce post', error }));
}

// DELETE
exports.deleteMessage = (req, res) => {
    console.log('deleteMessage', req.params);
    const postId = req.params.id;

    Message.destroy({ where: { id: postId } })
        .then(() => res.status(200).json({ message: 'message supprimé avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de supprimer ce message', error }));
}