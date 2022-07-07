<template>
  <div class="grp-header">
    <router-link to="/posts"><img src="https://user.oc-static.com/upload/2022/05/25/1653474647318_icon-left-font.png" class="grp-header__logo" alt="Logo de Groupomania"/></router-link>
    <div class="not-log" v-if="status !=='login'">
      <router-link to="/login"><div class="grp-header__createPost not-log__login">login</div></router-link>
      <router-link to="/signup"><div class="grp-header__createPost not-log__signup">s'inscrire</div></router-link>
    </div>
    <div class="menu-nav" v-if="status ==='login'">
      <router-link to="/profile">
        <div class="grp-header__profile"><i class="fa-solid fa-user"></i></div>

      </router-link>
      <div class="menu-nav__btn">
        <router-link to="/createPost"><div class="grp-header__createPost btn-create">Créer un post</div></router-link>
        <button @click="logout" class="btn_disconnect">Déconnexion</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters} from 'vuex'

export default {
  name: 'Header',

  mounted: function() {
    if (this.$store.state.user.userId != -1) {
      this.$store.commit('SET_STATUS', 'login')
    }
  },

  computed: {
    ...mapState({
      status: 'status'
    }),

    ...mapGetters({
      userName: 'userName',
      isAdmin: 'isAdmin'
    }),
  },

  methods: {
    logout: function () {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  }
}
</script>

<style lang="scss">
.not-log a{
  text-decoration: none;
}
.not-log{
  margin-right: 1em;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 200px;

  &__login{
    padding: 1.3em 3em;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;

    &:hover {
      background-color: #23c483;
      box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
      color: #fff;
      transform: translateY(-7px);
    }
  }

  &__signup{
    padding: 1.3em 3em;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;

    &:hover{
      background-color: #23c483;
      box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
      color: #fff;
      transform: translateY(-7px);
    }
  }
}


.grp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid grey;
  background-color: white;

  &__createPost{
    border: solid black 1px;
    border-radius: 20px;
    padding: 0.5em 1em;
    margin-bottom: 0.5em;
  }

  &__logo {
    height: 60px;
    margin-left: 20px;
    cursor: pointer;
  }

  &__profile {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 60px;
    border-radius: 99px;
    cursor: pointer;
    margin-bottom: 0.5em;
    background-color: #C2C0CB;
    margin-left: 20em;
    margin-top: 1em;

    &:hover {
      background-color: lightgray;
    }

    i {
      font-size: 30px;
    }
  }

  .menu-nav {
    margin-right: 1em;
    &__btn{
      display: flex;
    }
  }


  .btn-create{
    padding: 1.3em 3em;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;

    &:hover{
      background-color: #23c483;
      box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
      color: #fff;
      transform: translateY(-7px);
    }

    &:active{
      transform: translateY(-1px);
    }
  }

  a{
    text-decoration: none;
  }

  .btn_disconnect{
    padding: 1.3em 3em;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    margin-left: 1em ;
    transform: translate(0,-10px);

    &:hover{
      background-color: #FF0000;
      box-shadow: 0px 15px 20px #F79797;
      color: #fff;
      transform: translateY(-17px);
    }

    &:active{
      transform: translateY(-1px);
    }
  }


}
</style>
