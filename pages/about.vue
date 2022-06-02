<template>
  <div class="wrapper">
    <Logo />
    <client-only>
      <vue-typed-js
        :loop="true"
        :show-cursor="false"
        :type-speed="75"
        :back-speed="40"
        :strings="[
          '<p>가장 많이 <strong>픽</strong>한 카트바디는 뭘까?</p>',
          '<p>L1은 <strong>몇명</strong>이나 될까?</p>',
          '<p>어떤 라이센스가 가장 많을까?</p>',
          '<p>아이템전 전적은?</p>',
        ]"
      >
        <h2 class="typing"></h2>
      </vue-typed-js>
    </client-only>
    <p class="is-size-4 is-size-6-mobile">
      BAZZI.GG는 이런 궁금증에서 시작했습니다.
    </p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta';
export default Vue.extend({
  name: 'AboutPage',
   head(): MetaInfo{
    return this.$seo({
      title: "BAZZI.GG에 대해",
      description: "카트라이더 전적 검색 사이트, BAZZI.GG에 대해 알아보세요.",
    });
  },
})
</script>
<style scoped>
.typing {
  min-height: 60px;
  font-size: 2rem;
  display: flex;
  align-items: center;
}
@media screen and (max-width: 768px) {
  .typing {
    font-size: 1.5rem;
  }
}
</style>
