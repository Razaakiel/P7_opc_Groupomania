<template>
  <div class="onePost" v-if="post">
    <form class="post"  >
      <div class="post__title">
        <h2 v-if="!this.modedit">{{ post.title }}</h2>
        <input type="text" v-if="this.modedit" name="title" v-model="this.post.title"/>
      </div>
      <div class="post__content">
        <p v-if="!this.modedit">{{ post.content }}</p>
        <textarea v-if="this.modedit"  name="content" v-model="this.post.content"></textarea>
      </div>
      <img v-if="post.attachment" :src=" post.attachment " :alt="post.title">


      <div class="mine" v-if="(post.idUSERS === user.userId) || user.role">
      <div class="post__btn" >
        <button type='button' class="post__btn-delete" v-if="this.modedit" @click="modifyMod">retour</button>
        <button type='button' class="post__btn-modify" v-if="this.modedit" @click="modify">enregistrer</button>
        <button type='button' class="post__btn-delete" v-if="!this.modedit" @click="remove">supprimer</button>
        <button type='button' class="post__btn-modify" v-if="!this.modedit" @click="modifyMod">modifier</button>
      </div>
      </div>
    </form>

    <form class="com">
      <div class="__addCom">
        <input type="text" class="com__input" v-model="comment"/>
      </div>
      <div class="addCom__btn">
        <button type='button' class="com__btn" @click="createCom">Commenter</button>
      </div>
    </form>

    <!-- AFFICHAGE DES COMMENTAIRES -->
    <div class="comments">
      <div class="comment"
        v-for="(comment, index) in comments"
        :key="index">
        {{ comment.comment }} <br>( Posté par : {{ comment.userName }} )
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: "OnePost",
  data() {
    return {
      post: {},
      comments: [],
      comment: '',
      modedit: false,
    }
  },

  computed: {
    ...mapState({
      post: 'post',
      user: 'user'
    }),
    ...mapGetters({
      hasPostRole: 'hasPostRole',
      hasCommentRole: 'hasCommentRole',
      isAdmin: 'isAdmin',
      userId: 'userId',
      userName: 'userName',
    }),

    title: {
      get() {
        return this.$store.state.post.title;
      },
      set(newTitle) {
        this.$store.commit('SET_POST_TITLE', newTitle)
      }
    },

    content: {
      get() {
        return this.$store.state.post.content;
      },
      set(newContent) {
        this.$store.commit('SET_POST_CONTENT', newContent)
      }
    },

  },

  methods: {
    ...mapActions({
      getOnePost: 'getOnePost',
      createComment: 'createComment',
      getAllCommentsByPostId: 'getAllCommentsByPostId',
      deletePost: 'deletePost',
      modifyPost: 'modifyPost',
    }),



    modifyMod(){
      this.modedit = !this.modedit;
      console.log('modifMod')
    },

    modify() {
        const formData = new FormData();

        formData.append('title', this.title);
        formData.append('content', this.content);
        //formData.append('image', this.file);
        formData.append('userId', this.userId);
        const that = this
        this.modifyPost(formData).then(function() {
          that.modedit = false
        }).catch(function(error){
          console.warn(error);
        });
    },



    createCom() {
      this.createComment({
        postId: this.post.id,
        newComment: this.comment,
        userId: this.userId,
        userName: this.userName
      })
    },
    remove() {
      this.deletePost({ postId: this.post.id, authorId: this.userId }).then(this.$router.push('/posts'));
    }
  },

  mounted: function() {
    this.getOnePost({id: this.$route.params.id}).then(response => this.post = response);
    this.getAllCommentsByPostId({postId: this.$route.params.id}).then(response => this.comments = response);
  },
}
</script>

<style lang="scss">

.onePost{
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;
}

.post{
  display: flex;
  flex-direction: column;
  border:solid black 1px;
  border-radius: 10px;
  width: 500px;
  height:auto;
  margin-bottom: 1em;
  background-color: white;
  padding: 0 1em;

    &__title{
      padding-left: 1em;
      border-bottom: black solid 1px;
    }

    &__content{
      border-bottom:black solid 1px;
      height: 125px;
    }

    &__btn{
      display: flex;
      justify-content: space-between;
      margin: 0.5em 0 1em 0;
    }
}

.com{
  background: white;
  height: 60px;
    &__addCom{
    }

    &__input{
    margin: 5px 5px;
    }

    &__btn{
      margin: 0 5px;
    }

}


.supp, .modif, .com{
  border-radius: 5px;
  border: solid black 1px;
  cursor: pointer;
}
.comment {
  padding: 16px;
  margin: 8px;
  border:solid black 1px;
  border-radius: 10px;
  background-color: white;
}

  button{
    border-radius: 5px;
    border: solid black 1px;
  }

  .com{
    padding-left: 8px;
  }
</style>