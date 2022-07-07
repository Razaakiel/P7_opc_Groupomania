<template>
  <Header/>
  <div class="grp-wrapper">
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: { Header },
}
</script>

<style lang="scss">

html, body { 
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  background-color: #e7e7e7;

  .grp-wrapper {
    display: flex;
    height: 100%;
  }
}
</style>
