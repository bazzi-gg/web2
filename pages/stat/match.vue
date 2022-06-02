<template>
  <div class="top-box">
    <p class="is-size-6">매치 통계</p>
    <b-datepicker v-model="selectedDate" :mobile-native="false">
      <template #trigger>
        <span
          class="date"
          :class="{ 'date-live': $dayjs(selectedDate).isToday() }"
          >{{
            $dayjs(selectedDate).isToday()
              ? 'LIVE'
              : $dayjs(selectedDate).format('YYYY-MM-DD')
          }}</span
        >
      </template>
    </b-datepicker>
    <div v-if="data === null">
      <Alert
        :title="'데이터 없음'"
        :subtitle="'해당 날짜의 데이터가 없습니다.'"
        :help="false"
      />
    </div>
    <div v-if="data" :key="key" class="tile is-ancestor pt-2">
      <div class="tile is-vertical is-9">
        <div class="tile is-parent">
          <article
            class="tile is-child box p-3 is-flex is-justify-content-space-between summary"
          >
            <div v-if="data.playerCount">
              <p>{{ data.playerCount.toLocaleString('ko-kr') }}</p>
              <p class="description">플레이한 유저 수</p>
            </div>
            <div v-if="data.matchCount">
              <p>{{ data.matchCount.toLocaleString('ko-kr') }}</p>
              <p class="description">진행된 매치</p>
            </div>
            <div v-if="data.popularChannel">
              <p>{{ data.popularChannel }}</p>
              <p class="description">가장 핫한 채널</p>
            </div>
            <div v-if="data.hotTime">
              <p>{{ data.hotTime }}시</p>
              <p class="description">가장 핫한 시간</p>
            </div>
          </article>
        </div>
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <client-only>
                <PlayTimeCountByChannelLine
                  v-if="data.playTimeCountByChannel"
                  :data="data.playTimeCountByChannel"
                />
              </client-only>
            </article>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="is-size-6 pb-2">가장 많이 플레이한 유저</p>
          <div
            v-for="(player, idx) in data.mostPlayedPlayer"
            :key="player.nickname"
            class="player-box"
          >
            <img
              class="character"
              :src="`${$config.metadataUrl}character/${player.characterHash}.png`"
              alt=""
            />
            <div>
              <nuxt-link
                :to="{
                  name: 'rider-nickname',
                  params: { nickname: player.nickname },
                }"
                >{{ player.nickname }}</nuxt-link
              >
              <p class="player-count">{{ player.count }}회</p>
            </div>
            <span class="player-rank">#{{ idx + 1 }}</span>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      data: undefined,
      selectedDate: new Date(),
      key: '',
    }
  },
  head(): MetaInfo {
    return this.$seo({
      title: '매치 통계',
      description: `${this.$dayjs()
        .add(-1, 'day')
        .format('YYYY-MM-DD')} 매치 통계를 살펴보세요.`,
    })
  },
  watch: {
    async selectedDate(val) {
      const date = this.$dayjs(val).format('YYYY-MM-DD')
      this.data = await this.getData(date)
      this.key = date
    },
  },
  async created() {
    const date = this.$dayjs().format('YYYY-MM-DD')
    this.data = await this.getData(date)
    this.key = date
  },
  methods: {
    async getData(date: string): Promise<any> {
      const res = (await this.$statapi.getMatch(date)).data
      return typeof res === 'undefined' ? null : res
    },
  },
})
</script>
<style scoped>
.top-box {
  padding: 16px;
}
.character {
  width: 66px;
  height: 50px;
}
.player-box {
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
}
.player-count {
  font-size: 11px;
  color: #808080;
}
.player-rank {
  text-align: right;
  font-size: 18px;
  font-style: italic;
  align-self: center;
  flex: 1;
  padding-right: 16px;
}
.description {
  color: #808080;
}
.date-live {
  color: #ff0000;
}
.date {
  text-decoration: underline;
  cursor: pointer;
}
::v-deep .dropdown-trigger {
  width: initial;
}
::v-deep .chevron-left {
  width: 24px;
  height: 24px;
  color: hsl(229deg, 53%, 53%);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z' fill='rgba(72,95,199,1)'/%3E%3C/svg%3E");
}
::v-deep .chevron-right {
  width: 24px;
  height: 24px;
  color: hsl(229deg, 53%, 53%);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z' fill='rgba(72,95,199,1)'/%3E%3C/svg%3E");
}
@media screen and (max-width: 490px) {
  .summary {
    flex-direction: column;
  }
  .summary > * {
    margin-top: 8px;
  }
}
</style>
