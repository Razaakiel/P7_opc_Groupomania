 <template>
  <div class="createPost">
    <input class="createPost__title" type="text" placeholder="Entrer un titre" v-model="title"/>
    <input class="createPost__content" type="text" placeholder="Entrer un contenu" v-model="content"/>
    <input
        name="inputFile"
        type="file"
        class="custom-file-input"
        id="inputFile"
        aria-describedby="inputFileAddon"
        @change="onFileChange"
    />

      <button class="createPost__btn-post" @click="postCreate">Poster</button>
  </div>


</template>

<script>
import {mapGetters, mapState, mapActions} from "vuex";
import axios from "axios";

export default {
  name: "CreatePost",
  data() {
    return {
      title: '',
      content: '',
      userId:"",
      file: null,
      likes: 0
    };
  },

  methods: {
    ...mapActions({
      createPostAction: 'createPost',
    }),
    postCreate() {
      console.log('postCreate')
      const fd = new FormData();
      fd.append("inputFile", this.file);
      fd.append("title", this.title);
      fd.append("content", this.content);
      fd.append("idUSERS", this.user.userId);
      fd.append("likes", this.likes);
      console.log('postCreate2', this.file, this.title, this.content, this.user.userId)
      axios.post('http://localhost:3000/api/post', fd,
          {
            headers: {
              'Content-Type': 'application/form-data',
              "Authorization": `Bearer ${this.user.token}`,
            },
          }
      )
          .then(()=> {
            this.title = ""
            this.content = ""
            this.file = null
            this.likes = 0
            this.userId = ""
            alert('publication réussie!')
            this.$router.push({path : 'posts'})
          })
          .catch((error)=>{
            console.log(error);
          })
    },
    onFileChange(e) {
      this.file = e.target.files[0] || e.dataTransfer.files;
    }

  },
  computed: {
    ...mapState({
      user: 'user'
    }),
    ...mapGetters({
      userId: 'userId',
      isAdmin: 'isAdmin'
    }),

  }
}


</script>

<style lang="scss">
  .createPost{
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    margin-top: 150px;
    width: 500px;


    &__title{
      margin: 1em 0;
    }

    &__content{
      margin-bottom: 1em ;
      height: 150px;
    }
  }

  .createPost__btn-post{
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
    margin-top: 3em;

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

</style>