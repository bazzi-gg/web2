<template>
  <div id="app">
    <Header />
    <main class="container w-100">
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'DefaultLayout',
  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: 'https://bazzi.gg' + this.$route.path
        }
      ]
    }
  }
})
</script>
