import Vuex from 'vuex';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
})

// Utilisateur par défaut
const defaultUser = {
  userId: -1,
  token: ''
}

let user = localStorage.getItem('user');

// Si l'utilisateur n'est pas dans le local storage, l'utilisateur est par défaut
// Sinon récupérer l'utilisateur du local storage
if (!user) {
  user = defaultUser;
  console.log('pas connecté');
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  } catch(exception) {
    user = defaultUser;
  }
}

export default new Vuex.Store({
  state: {
      status: '',
      user: user,
  },

  getters: {
    userName: state => {
      return state.user.userName;
    },

    userId: state => {
      return state.user.userId;
    },

    hasPostRole: state => {
      if (state.user.id === state.user.userId) {
        return true;
      } else {
        return false;
      }
    },

    hasCommentRole: (state) => (index) => {
      if (state.user.id === state.comments[index].userId) {
        return true;
      } else {
        return false;
      }
    },

    isAdmin: state => {
      if (state.user.isAdmin) {
        return true;
      } else {
        return false
      }
    },
  },

  mutations: {
    SET_STATUS: function(state, status) {
      state.status = status;
    },

    LOG_USER: function(state, user) {
      console.log('setLocalStorage');
      instance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },

    LOG_OUT: function(state) {
      state.user = defaultUser;
      state.userInfos = {}
      localStorage.clear();
    },

    USER_INFOS: function(state, user) {
      state.user = user;
    },

    SET_USER_NAME: function(state, modifiedName) {
      state.user.userName = modifiedName;
    },
  },



  actions: {
    // S'inscrire
    signup({ commit }, userInfos) {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('auth/signup', userInfos)
            .then(function(response) {
              commit('SET_STATUS', 'created');
              resolve(response);
            })
            .catch(function(error) {
              commit('SET_STATUS', 'error_create');
              reject(error);
            })
      });
    },

    //Se connecter
    login({ commit }, userInfos) {
      return new Promise((resolve, reject) => {
        instance.post('auth/login', userInfos)
            .then(function(response) {
              commit('SET_STATUS', 'login');
              commit('LOG_USER', response.data);
              resolve(response);
            })
            .catch(function(error) {
              commit('SET_STATUS', 'error_login');
              reject(error);
            })
      });
    },

    // Se déconnecter
    logout({ commit }) {
      commit('LOG_OUT');
      commit('SET_STATUS', '');
      // Supprimer l'utilisateur du local storage
      localStorage.removeItem('users');
    },

    // Afficher les informations d'un user
    getUserInfos({ commit, state }) {
      return new Promise((resolve, reject) => {
        instance.get(`log/users/${state.user.userId}`)
            .then(function(response) {
              commit('LOG_USER', response.data);
              resolve(response.data);
            })
            .catch(function(error) {
              reject(error);
            });
      });
    },

    // Modifier le nom d'un utilisateur
    editUserName({ state }, newUserName) {
        console.log(newUserName)
      return new Promise((resolve, reject) => {
        instance.put(`log/users/${state.user.userId}`, newUserName)
            .then(function(response) {
              resolve(response);
            })
            .catch(function(error) {
              reject(error);
            });
      });
    },

    // Supprimer un utilisateur
    deleteUser({ state }) {
      return new Promise((resolve, reject) => {
        instance.delete(`log/users/${state.user.userId}`)
            .then(function(response) {
              resolve(response);
            })
            .catch(function(error) {
              reject(error);
            })
      });
    },

    //Créer un post
    createPost(context, newPost) {
          axios({
              method: "post",
              url: "http://localhost:3000/api/post",
              data: newPost,
              headers: { "Content-Type": `multipart/form-data, boundary=${newPost._boundary}`,
                        "Authorization": `Bearer ${user.token}`},

          })
    },

    //Récupérer tout les posts
    getAllPosts() {
      return new Promise((resolve, reject) => {
        instance.get("post").then(response => {
          resolve(response.data.listTmp);
        })
        .catch(error => {
          console.log('Erreur lors de la récupération des posts', error);
          reject(error);
        });
      });
    },

    // Afficher un post
    getOnePost(context, params) {
      return new Promise((resolve, reject) => {
        instance.get(`post/${params.id}`)
            .then(function(response) {
              resolve(response.data);
            })
            .catch(function(error) {
              reject(error);
            })
      });
    },
      // Modifier un post
      modifyPost({ state }, modifiedPost) {
          return new Promise((resolve, reject) => {
              instance.put(`post/${state.post.id}`, modifiedPost, {'Content-Type': 'application/form-data'})
                  .then(function(response) {
                      resolve(response);
                  })
                  .catch(function(error) {
                      reject(error);
                  });
          });
      },

      // Supprimer un post
      deletePost({ state }, params) {
          // Si c'est l'admin, il peut supprimer n'importe quel post
          // Sinon l'utilisateur ne peut supprimer que son propre post
          console.log('delete', params.postId, params.authorId);
          if (state.user.isAdmin || params.authorId === state.user.userId) {
              return new Promise((resolve, reject) => {
                  instance.delete(`post/admin/${params.postId}`)
                      .then(function(response) {
                          resolve(response);
                      })
                      .catch(function(error) {
                          reject(error);
                      })
              });
          }
      },

    //CreateCom
    createComment(context, params) {
      return new Promise((resolve, reject) => {
        instance.post(`post/${params.postId}/comments`,  {
            postId: params.postId,
            comment: params.newComment,
            userId: params.userId,
            userName: params.userName})
            .then(function(response) {
              resolve(response);
            })
            .catch(function(error) {
              reject(error);
            })
      });
    },

    // Afficher tous les commentaires
    getAllCommentsByPostId(context, params) {
      return new Promise((resolve, reject) => {
        instance.get(`post/${params.postId}/comments`)
            .then(function(response) {
              resolve(response.data.listCmt);
            })
            .catch(function(error) {
              reject(error);
            });
      });
    },
  },
})
