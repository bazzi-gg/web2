<template>
  <header class="has-background-primary">
    <b-navbar
      class="container is-centered-mobile is-shadowless"
      :mobile-burger="false"
    >
      <template slot="start">
        <b-navbar-item
          tag="NuxtLink"
          :to="'/'"
          exact
          exact-active-class="navbar-active"
        >
          홈
        </b-navbar-item>
        <b-navbar-item
          tag="NuxtLink"
          :to="'/influencer'"
          exact
          exact-active-class="navbar-active"
        >
          프로/인플루언서
        </b-navbar-item>
        <b-navbar-dropdown label="통계" :right="true" :collapsible="true">
          <b-navbar-item
            tag="NuxtLink"
            :to="'/stat/match'"
            exact
            exact-active-class="is-active"
            >매치
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>
    </b-navbar>
  </header>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
})
</script>
<style scoped>
.navbar-item:before {
  content: '';
  position: absolute;
  z-index: 1;
  left: 50%;
  right: 50%;
  bottom: 0;
  background: white;
  height: 4px;
}
.navbar-item:hover:before,
.navbar-active:before {
  left: 0;
  right: 0;
  background-color: white;
}

@media screen and (max-width: 768px) {
  .is-centered-mobile >>> .navbar-start {
    margin-right: initial;
  }
  .is-centered-mobile >>> .navbar-end {
    justify-content: initial;
    margin-left: initial;
  }
  .is-centered-mobile >>> .navbar-menu {
    justify-content: center;
  }
}
</style>
