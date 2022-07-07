# Groupomania
Projet 7 du parcours développeur web d'OpenClassrooms : Créez un réseau social d’entreprise

## Installation backend
Installer `nodejs` et `npm` sur votre machine en local. Après, se positionner sur le dossier backend à partir du projet.
```
> cd backend
```
Ensuite, installer les composants du projet.
```
> npm install
```
Enfin, lancer le projet avec `nodemon serve`
```
> nodemon serve
```
Le serveur sera accessible sur http://localhost:3000 par défaut.

## Installation frontend
Le projet a été généré avec vue.
Pour le faire fonctionner, se positionner sur le dossier frontend à partir du projet.
```
> cd frontend
```
Ensuite, installer les composants du projet.
```
> npm install
```
Enfin, démarrer `npm run serve` pour avoir accès au serveur de développement. Rendez-vous sur `http://localhost:8080/`.
```
> npm run serve
```

## Database
Une fois l'installation des composants nécessaire au backend et frontend,
Il vous faudra créer votre Database (DB). Pour cela je vous invite à regarder une vidéo explicative qui m'a aidé si vous n'avez aucune connaissance sur le sujet. =).
https://www.youtube.com/watch?v=hggvCij14F0         

Ensuite, lors de la création des models il vous faudra faire:
- Un model `users` dont vous mettrez les columns : `id`,`email`,`username`,`password`,`bio`et`isAdmin`.
- Un model `messages` dont vous mettrez les columns : `id`,`idUSERS`,`title`,`content`,`attachment`et`likes`.
- Et un model `comments` dont vous mettrez les columns: `id`,`userName`,`userId`,`comment`et`postId`.

Enfin, il vous restera à remplacer dans la page `app` du `backend` à la ligne `17`, les informations `sequelize_db`, `root`, et `mdp`,
par vos propres informations que vous pourrez retrouver dans votre fichier `config.json` qui seront `username`,`password` et `database`.
