<template>
  <div>
    <div class="pb-8">
      <span class="has-text-bold">{{ title }}</span>
      <span class="text-live">LIVE</span>
    </div>
    <div
      v-for="(item, idx) in data"
      :key="idx"
      class="box is-flex is-flex-direction-row is-align-items-center"
    >
      <span class="rank">{{ idx + 1 }}</span>
      <img
        :src="`${$config.metadataUrl}${item.nameHash}`"
        alt=""
        class="img"
        @error="imageNotFoundCallback"
      />
      <div>
        <p>{{ item.name }}</p>
        <p class="value">{{ item.pickRate.toFixed(2) }}%</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Ranking } from '~/types/stat/index'
export default Vue.extend({
  name: 'RankingPreview',
  props: {
    title: {
      type: String,
      required: true,
    } as PropOptions<string>,
    data: {
      type: Array,
      required: true,
    } as PropOptions<Ranking[]>,
    imageNotFoundCallback: {
      type: Function,
      default: (e: any) => {},
      required: false,
    },
  },
})
</script>
<style scoped>
.rank {
  width: 25px;
  padding-left: 16px;
}
.box {
  min-width: 225px;
  height: 48px;
  margin-bottom: 8px;
}
.img {
  width: 42px;
  height: 32px;
  margin-left: 8px;
  margin-right: 8px;
}
.value {
  color: #808080;
  font-size: 11px;
}
.text-live {
  float: right;
  color: #ff0000;
}
.pb-8 {
  padding-bottom: 8px;
}
</style>
