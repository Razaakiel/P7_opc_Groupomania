const db = require ("../lib/models")
const User = db.User
const Comment = db.Comment

// Ajouter un nouveau commentaire
exports.createComment = (req, res) => {
    console.log('create', req.body);
    const comment = new Comment ({
        comment: req.body.comment,
        userId: req.body.userId,
        userName: req.body.userName,
        postId: req.body.postId,
        createdAt: new Date(),
        updatedAt: new Date(),
    });console.log('com',comment)
    comment.save()
        .then(() => res.status(201).json({ message: 'Commentaire créé avec succès' }))
        .catch(error => res.status(500).json({ message: 'Impossible de créer ce commentaire', error }));
}

// Afficher tous les commentaires
exports.getCommentsByPostId = (req, res, next) => {
    console.log(req.params.postId)
    Comment.findAll({
        order: [["id", "DESC"]],
    }).then(comments => {
            let listCmt = [];
            comments.forEach((comment) => {
                    let cmtTmp = {
                        id:         comment.dataValues.id,
                        userId:     comment.dataValues.userId,
                        postId:     comment.dataValues.postId,
                        comment:    comment.dataValues.comment,
                        createdAt:  comment.dataValues.createdAt,
                        updatedAt:  comment.dataValues.updatedAt,
                        userName:  comment.dataValues.userName,
                    };
                if (parseInt(cmtTmp.postId) === parseInt(req.params.postId)) listCmt.push(cmtTmp);
            });
            res.status(200).json({ listCmt });
        })
        .catch(error => res.status(500).json({ error }))
}



// Afficher un commentaire
exports.getOneComment = (req, res) => {
    const id = req.params.id;
    const postId = req.params.postId;

    Comment.findOne({ where: { id: idUSERS, postId: postId }, include: { model: User } })
        .then(comment => {
            if(comment) {
                res.status(200).json(comment)
            } else {
                res.status(404).json({ message: 'Commentaire non trouvé' })
            }
        })
        .catch(error => res.status(400).json({ message: 'Impossible d\'afficher ce commentaire', error }));
}

// Modifier un commentaire
exports.modifyComment = (req, res) => {
    const id = req.params.id;
    const postId = req.params.postId;
    const userId = req.body.userId;

    const updatedComment = {
        content: req.body.content,
    };

    Comment.update(updatedComment, { where: { id: id, postId: postId, userId: userId } })
        .then(() => res.status(200).json({ message: 'Commentaire modifié avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de modifier ce commentaire', error }));
}

// Supprimer un commentaire
exports.deleteComment = (req, res) => {
    const id = req.params.id;
    const postId = req.params.postId;
    const userId = req.body.userId;

    Comment.destroy({ where: { id: id, postId: postId, userId: userId } })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de supprimer ce commentaire', error }))
}

// Supprimer un commentaire par l'admin
exports.deleteCommentByAdmin = (req, res) => {
    const id = req.params.id;
    const postId = req.params.postId;

    Comment.destroy({ where: { id: id, postId: postId } })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de supprimer ce commentaire', error }))
}