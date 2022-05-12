<template>
  <img
    :src="require('@/assets/logo-black.svg')"
    alt="BAZZI.GG LOGO"
    class="logo"
  />
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Logo',
})
</script>

<style scoped>
.logo {
  width: 400px;
  height: 60px;
  fill: black;
}
@media screen and (max-width: 768px) {
  .logo {
    width: calc(80%);
  }
}
</style>
