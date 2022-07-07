<template>
  <div class="grp-posts">
    <Post v-for="(post, index) in posts"
          class="grp-posts__post"
          :key="index"
          :title="post.title"
          :content="post.content"
          :attachment="post.attachment"
          :username="post.user.userName"
          @click="$router.push(`/onePost/${post.id}`)"/>
  </div>

</template>

<script>
import { mapActions } from 'vuex';
import Post from '@/components/Post';

export default {
  name: 'Posts',
  components: { Post },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    ...mapActions({
      getAllPosts: 'getAllPosts',
    }),
  },
  mounted() {
    this.getAllPosts().then(response => {
      this.posts = response;
    });
  }
}
</script>

<style lang="scss">
.grp-posts {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

  &__post {
    cursor: pointer;
    border:solid black 1px;
    border-radius: 10px;
  }
}

.test{
  color:red;
}
</style>