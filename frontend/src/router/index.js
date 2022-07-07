import { createRouter, createWebHistory } from 'vue-router'
//Import Utilisateurs
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

//Import Posts
import CreatePost from '../views/CreatePost.vue'
import Posts from '../views/Posts.vue'
import OnePost from '../views/OnePost'


const routes = [
    //Routes utilisateurs
  { path: '/signup', name: 'Signup', component: Signup},
  { path: '/login', name: 'Login', component: Login},
  { path: '/profile', name: 'Profile', component: Profile},

    //Routes Posts
  { path: '/posts', name: 'Posts', component: Posts},
  { path: '/createPost', name: 'CreatePost', component:CreatePost},
  { path: '/onePost/:id', name: 'OnePost', component: OnePost},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && to.name !== 'Signup') {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) next('/login');
  }
  next();
});

export default router
