<template>
  <div class="grp-profile">
    PAGE PROFILE
    <div class="nameModif">
      <p>Votre nom : {{ userName }}</p>
    <input  type="text"
            v-model="newName"
            placeholder="Modifier votre nom"/>
    </div>
    <button class="btn__modif" @click="modifier">Modifier</button>

    <button class="btn__delete" @click="deleteUser">Supprimer votre compte</button>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Profile',
  components: {},
  data() {
    return {
      user: { username: '' },
      newName: '',
    };
  },
  computed: {
    ...mapGetters({
      userName: 'userName',
    }),
  },
  methods: {
    ...mapActions({
      editUserName: 'editUserName',
      getUserInfos: 'getUserInfos',
      deleteUser: 'deleteUser',
    }),
    modifier() {
        this.editUserName({ name: this.newName}).then(() => {
          this.getUserInfos();
        }, function(error) {
          console.log(error);
        });
      }
    },

    deleteUser(){
      const self = this;
      this.$store.dispatch('deleteUser')
          .then(function() {
            self.$store.dispatch('logout');
            self.$router.push('Login');
          }, function(error) {
            console.log(error);
          });
    }
}

</script>

<style lang="scss">

.grp-profile{
  margin-left: auto;
  margin-right: auto;
  margin-top: 13em;
}

button{
  margin-top: 10px;
}

.btn__modif{
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
  margin-right: 1em;
  margin-top: 2em;

  &:hover{
    background-color: #23c483;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-17px);
  }

  &:active{
    transform: translateY(-1px);
  }
}

.btn__delete{
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
    background-color: #FF0000;
    box-shadow: 0px 15px 20px #F79797;
    color: #fff;
    transform: translateY(-17px);
  }

  &:active{
    transform: translateY(-1px);
  }

}
</style>
