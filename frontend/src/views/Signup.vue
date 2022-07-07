<template>
  <div class="grp-signup">
    <h1 class="grp-signup__title">S'inscrire</h1>
    <input type="text" class="mail" v-model="login" placeholder="Entrer votre email"/>
    <input type="text" class="name" v-model="userName" placeholder="Entrer votre nom"/>
    <input type="text" class="mdp" v-model="password" placeholder="Entrer votre mot de passe"/>
    <button @click="goToSign" class="btn-signup">S'inscrire</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Signup",
  data() {
    return {
      login: '',
      userName: '',
      password: ''
    }
  },

    methods: {
    ...
      mapActions({
        signupAction: 'signup',
        loginAction: 'login',
      }),


      goToSign() {
        this.signupAction({
          userName: this.userName,
          email: this.login,
          password: this.password
        }).then(this.$router.push('login'));
      }
    }
  }



</script>

<style lang="scss">
.grp-signup {
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
.name{
  margin-bottom: 0.5em;
}
.mdp{
  margin-bottom: 0.5em;
}

.btn-signup{
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
</style>