<template>
  <div class="match-box">
    <b-collapse
      v-for="(match, index) of matchList"
      :key="index"
      class="match"
      :class="{
        'match--win': match.win,
        'match--lose': !match.win,
        'match--retire': match.rank == 99,
      }"
      animation="slide"
      :open="false"
      @open="$set(openMatchDetailList, match.matchId, true)"
    >
      <template #trigger="props">
        <div class="header">
          <div class="header-match-info">
            <p class="header-match-info-time">
              {{
                $dayjs
                  .duration($dayjs(match.endDateTime).diff($dayjs()))
                  .humanize(true)
              }}
            </p>
            <p class="pt-2">{{ match.win ? '승리' : '패배' }}</p>
            <p class="header-match-info-channel">
              {{ ChannelStringWordBreak(match.channel) }}
            </p>
          </div>
          <div class="header-used-items">
            <img
              class="header-used-character"
              :src="`${$config.metadataUrl}character/${match.characterHash}.png`"
              alt=""
              @error="CharacterNotFound"
            />
            <img
              class="header-used-kartbody"
              :src="`${$config.metadataUrl}kart/${match.kartbodyHash}.png`"
              alt=""
              @error="KartbodyNotFound"
            />
          </div>
          <span class="header-rank">{{
            match.rank === 99 ? '리타' : `#${match.rank}`
          }}</span>
          <div class="header-track-info">
            <p>{{ match.track }}</p>
            <p class="header-track-record">{{ match.record }}</p>
          </div>
          <Icon
            class="header-arrow"
            :icon="props.open ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'"
            :color="'#000000'"
          />
        </div>
      </template>
      <div v-if="openMatchDetailList[match.matchId] === true">
        <MatchDetail :id="match.matchId" :my-access-id="myAccessId" />
      </div>
    </b-collapse>
    <b-button
      v-show="showMoreButton"
      class="more"
      :loading="loading"
      @click="getMoreMatch()"
      >더보기</b-button
    >
  </div>
</template>
<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Match } from '../../types/player-detail.ts/match'
import { CharacterNotFound, KartbodyNotFound } from '../../helpers/callback'
export default Vue.extend({
  props: {
    data: {
      type: Array,
      required: true,
    } as PropOptions<Match[]>,
    myAccessId: {
      type: String,
      required: true,
    },
    channel: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      openMatchDetailList: {},
      matchList: [] as Match[],
      showMoreButton: true,
      loading: false,
    }
  },
  watch: {
    data() {
      this.init()
    },
  },
  created() {
    this.init()
  },
  methods: {
    KartbodyNotFound,
    CharacterNotFound,
    init() {
      this.matchList = [...this.data]
      this.showMoreButton = this.matchList.length === 20
    },
    ChannelStringWordBreak(str: string): string | null {
      if (str === null) {
        return null
      }
      const idx = str.indexOf('(')
      if (idx === -1) {
        return str
      }
      const result =
        str.slice(0, idx) + '\n' + str.slice(idx + 1, str.lastIndexOf(')'))
      return result
    },
    async getMoreMatch() {
      this.loading = true
      const lastMatchId = this.matchList[this.matchList.length - 1].matchId
      const res = await this.$api.getMoreMatch(
        this.myAccessId,
        lastMatchId,
        this.channel
      )
      this.matchList.push(...res.matches)
      this.showMoreButton = res.moreMatches
      this.loading = false
    },
  },
})
</script>
<style scoped>
.match-box {
  padding-left: 32px;
}
.match {
  padding-bottom: 16px;
}
.match--win .header {
  box-shadow: inset 4px 0px 0px #4dabf5;
}
.match--lose .header {
  box-shadow: inset 4px 0px 0px #ed4b82;
}
.match--retire .header {
  box-shadow: inset 4px 0px 0px grey;
}
.match--win .header-rank {
  color: #4dabf5;
}
.match--lose .header-rank {
  color: #ed4b82;
}
.match--retire .header-rank {
  color: grey;
}
.header {
  background-color: white;
  border-radius: 4px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.header-match-info {
  padding-left: 16px;
  width: 120px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.header-match-info-time {
  color: #7a7a7a;
}
.header-used-character {
  width: 66px;
  height: 50px;
}
.header-used-kartbody {
  width: 50px;
  height: 37px;
  margin-left: -6px;
}
.header-used-items {
  display: flex;
  align-items: flex-end;
}
.header-arrow {
  margin-left: auto;
  margin-right: 16px;
}
.header-rank {
  /* width: 128px; */
  flex: 1;
  font-size: 24px;
  text-align: center;
}
.header-track-info {
  flex: 2;
}
.header-track-record {
  font-style: italic;
  font-size: 16px;
}
.header-match-info-channel {
  font-size: 0.5rem;
  white-space: pre-line;
  color: #7a7a7a;
  text-align: center;
  line-height: 10px;
}
.more {
  width: 100%;
}
@media screen and (max-width: 768px) {
  .match-box {
    padding-left: 0;
  }
}
@media screen and (max-width: 578px) {
  .header-used-items {
    display: none;
  }
}
</style>
