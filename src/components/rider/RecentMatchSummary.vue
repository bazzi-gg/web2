<template>
  <div class="box recent-match-summary">
    <client-only>
      <WinRateDonut
        :key="data.win"
        :win="data.win"
        :lose="data.lose"
        :win-rate="data.winRate"
      />
    </client-only>
    <hr class="divider" />
    <div class="is-flex is-flex-direction-column">
      <div class="pl-3">
        <p>{{ data.averageRank.toFixed(1) }}위</p>
        <p class="description">평균 순위</p>
      </div>
      <div class="pl-3 pt-2 pb-2">
        <p>{{ data.mostPlayedTrack }}</p>
        <p class="description">가장 많이 플레이한 트랙</p>
      </div>
      <div class="pl-3">
        <p>{{ data.mostUsedKartbody }}</p>
        <p class="description">가장 많이 사용한 카트</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { RecentMatchSummary } from '~/types/player-detail.ts/recent-match-summary'
export default Vue.extend({
  props: {
    data: {
      type: Object,
      required: true,
    } as PropOptions<RecentMatchSummary>,
  },
})
</script>
<style scoped>
.recent-match-summary {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 190px;
}
.divider {
  height: 159px;
  border: 1px dashed #c4c4c4;
}
.description {
  font-size: 11px;
  color: #878787;
}
</style>
