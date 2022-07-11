<template>
  <section class="section">
    <p class="is-size-2 is-size-3-mobile">#감사합니다, #도와줘서-고마워요</p>
    <p class="is-size-5">BAZZI.GG에 기여하신 분들입니다.</p>
    <div class="pt-5">
      <b-tooltip
        v-for="contributor of contributors"
        :key="contributor.nickname"
        :label="contributor.description"
        position="is-top"
      >
        <span class="p-1" :style="{ color: contributor.color }">
          {{ contributor.nickname }}
        </span>
      </b-tooltip>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import strapi from '../plugins/strapi'
import { Contributor } from '../types/contributor'
export default Vue.extend({
  name: 'ThanksPage',
  data() {
    return {
      contributors: [] as Contributor[],
    }
  },
  head(): MetaInfo {
    return this.$seo({
      title: '기여자',
      description: 'BAZZI.GG에 기여해주신 소중한 분들입니다.',
    })
  },
  async created() {
    this.contributors = await this.$strapi.getContributors()
  },
})
</script>
