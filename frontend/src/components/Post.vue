<template>
  <div class="grp-post">
    <div class="grp-post__title"> <h2>{{ title }}</h2> </div>
    <div class="grp-post__content"> {{ content }}</div>
    <img v-if="attachment" :src=" attachment " :alt="title">
    <br>( Posté par: {{ username }} )
  </div>
</template>

<script>

export default {
  name: 'Post',
  props: {
    title: { type: String },
    content: { type: String },
    attachment: {type: String},
    username: { type: String },
  }
}
</script>

<style lang="scss">
.grp-post {
  display: flex;
  flex-direction: column;
  width: 500px;
  height: auto;
  background-color: white;
  margin: 8px;
  padding: 0 1em 0 1em;

  &__title {
  border-bottom: black solid 1px;
  padding: 0 0 0 1em;
  }

  &__content{
    padding: 1em 0 0 1em;
  }
}
</style>
