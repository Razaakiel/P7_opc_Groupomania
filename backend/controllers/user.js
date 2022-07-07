const db     = require("../lib/models");
const user   = db.User
const { Op } = require("sequelize");


// Afficher un user
exports.getOneUser = (req, res) => {
    const userId = req.params.id;

    user.findByPk(userId)
        .then(user => {
            if (user) {
                res.status(200).json({
                    id: user.id,
                    userName: user.userName,
                    email: user.email,
                    isAdmin: user.isAdmin
                });
            } else {
                res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
        })
        .catch(error => res.status(500).json({ message: 'Impossible de trouver cet utilisateur', error }));
}

// Modifier un user
exports.modifyUser = (req, res) => {
    console.log('modify', req.body, req.params)
    const userId = req.params.id;
    const updatedUser = {
        userName: req.body.name
    }

    user.update(updatedUser, { where: { id: userId } })
        .then(() => res.status(200).json({ message: 'Utilisateur modifié avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de modifier cet utilisateur', error }));
}

// Supprimer un user
exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    user.destroy({ where: { id: userId } })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de supprimer cet utilisateur', error }));
}


// Afficher tous les utilisateurs sauf l'admin
exports.getAllUsersByAdmin = (req, res) => {
    const userId = req.params.id;

    user.findAll({
        where: {
            id: {
                [Op.not]: userId
            }
        }
    }).then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ message: 'Impossible d\'afficher les utilisateurs', error }));
}

// Modifier le rôle d'un utilisateur
exports.modifyUserRole = (req, res) => {
    const id = req.params.id;

    let updatedRole = {
        isAdmin: req.body.isAdmin
    }

    user.update(updatedRole, { where: { id: id }})
        .then(() => res.status(200).json({ message: 'Rôle de l\'utilisateur modifié avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de modifier le rôle de cet utilisateur', error }));
}