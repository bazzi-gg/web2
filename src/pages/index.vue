<template>
  <div class="is-align-items-center is-flex is-flex-direction-column">
    <Logo class="is-clickable" @click.native="refreshPage()" />
    <SearchBar />
    <div class="ranking-preview-table pt-5">
      <RankingPreview
        :title="'아이템 전 카트바디 픽률'"
        :data="itemKartbodyRanking"
        class="p-2 ranking-preview"
        :image-not-found-callback="KartbodyNotFound"
      />
      <RankingPreview
        class="p-2 ranking-preview"
        :title="'스피드 전 카트바디 픽률'"
        :data="speedKartbodyRanking"
        :image-not-found-callback="KartbodyNotFound"
      />
    </div>
    <div class="ranking-preview-table">
      <RankingPreview
        :title="'아이템 전 트랙 픽률'"
        :data="itemTrackRanking"
        class="p-2 ranking-preview"
      />
      <RankingPreview
        class="p-2 ranking-preview"
        :title="'스피드 전 트랙 픽률'"
        :data="speedTrackRanking"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Ranking } from '../types/stat'
import { CharacterNotFound, KartbodyNotFound } from '../helpers/callback'
export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      itemKartbodyRanking: [] as Ranking[],
      speedKartbodyRanking: [] as Ranking[],
      itemTrackRanking: [] as Ranking[],
      speedTrackRanking: [] as Ranking[],
    }
  },
  async created() {
    const date: string = this.$dayjs().format('YYYY-MM-DD')
    const [itemKartbodyData, speedKartbodyData, speedTrackData, itemTrackData] =
      await Promise.all([
        this.$statapi.getKartbody(date, 'item-kartbody'),
        this.$statapi.getKartbody(date, 'speed-kartbody'),
        this.$statapi.getTrack(date, 'speed-track'),
        this.$statapi.getTrack(date, 'item-track'),
      ])
    this.setMetadataUrl(itemKartbodyData.data, 'kart/', '.png')
    this.itemKartbodyRanking = itemKartbodyData.data

    this.setMetadataUrl(speedKartbodyData.data, 'kart/', '.png')
    this.speedKartbodyRanking = speedKartbodyData.data

    this.setMetadataUrl(speedTrackData.data, 'track/', '.png')
    this.speedTrackRanking = speedTrackData.data

    this.setMetadataUrl(itemTrackData.data, 'track/', '.png')
    this.itemTrackRanking = itemTrackData.data
  },
  methods: {
    CharacterNotFound,
    KartbodyNotFound,
    refreshPage(): void {
      window.location.reload()
    },
    setMetadataUrl(array: Ranking[], prefix: string, sufflx: string) {
      for (let i = 0; i < array.length; i++) {
        array[i].nameHash = prefix + array[i].nameHash + sufflx
      }
    },
  },
})
</script>

<style scoped>
.logo {
  margin-bottom: 24px;
  margin-top: 150px;
}
@media screen and (max-width: 768px) {
  .logo {
    margin-top: 70px;
  }
}
.ranking-preview-table {
  flex-direction: row;
  display: flex;
}
@media screen and (max-width: 500px) {
  .ranking-preview-table {
    flex-direction: column;
  }
  .ranking-preview {
    width: 410px;
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
}
@media screen and (max-width: 420px) {
  .ranking-preview {
    width: 300px;
  }
}
</style>
