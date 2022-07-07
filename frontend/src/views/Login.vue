<template>
  <div class="grp-login">
    <h1 class="grp-login__title">Se connecter</h1>
    <input type="text" class="mail" v-model="login" placeholder="Entrer votre email"/>
    <input type="text" class="mdp" v-model="password" placeholder="Entrer votre mot de passe"/>
    <button @click="goToLog" class="btn-connect">Connexion</button>
  </div>

</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      login: '',
      password: '',
    };
  },
  methods: {
    ...mapActions({
      loginAction: 'login',
    }),
    goToLog() {
      this.loginAction({
        email: this.login,
        password: this.password
      }).then(() => {
        this.$router.push('/posts');
      });
    }
  },
}
</script>

<style lang="scss">
  .grp-login {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    margin-top: 13em;

    &__title{
      color: red;
    }
  }

  .mail{
    margin-bottom: 0.5em;
  }

  .mdp{
    margin-bottom: 0.5em;
  }

  .btn-connect {
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

    &:active{
      transform: translateY(-1px);
    }
  }

</style>