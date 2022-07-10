<template>
  <div class="box recent-track-record">
    <div class="header">
      <span class="header-title"> 최근 200게임 트랙 전적 </span>
      <div class="menu-box">
        <Icon
          :icon="`ri-sort-${sortDirection}`"
          :width="20"
          :color="'#888888'"
          class="mr-2"
          @click.native="
            sortDirection === 'desc'
              ? (sortDirection = 'asc')
              : (sortDirection = 'desc')
          "
        />
        <b-dropdown>
          <template #trigger>
            <button class="sort-type-dropdown">
              {{ sortTypes[selectSortTypeIndex].name }}
              <Icon
                :icon="'ri-arrow-down-s-fill'"
                :color="'#000000'"
                :width="24"
                :height="24"
                class="is-pulled-right"
              />
            </button>
          </template>
          <b-dropdown-item
            v-for="(item, i) in sortTypes"
            :key="item.uid"
            @click="selectSortTypeIndex = i"
            >{{ item.name }}</b-dropdown-item
          >
        </b-dropdown>
      </div>
    </div>
    <div class="list">
      <div v-for="item in tracks" :key="item.trackHash" class="track">
        <img
          :src="`${$config.metadataUrl}track/${item.trackHash}.png`"
          alt=""
          class="track-img"
        />
        <div class="track-info is-text-ellipsis">
          <p class="is-text-ellipsis">{{ item.track }}</p>
          <span class="track-info-subtitle">{{ item.bestTime }}</span>
          <span class="track-info-subtitle pl-3"
            >상위 {{ item.top.toFixed(0) }}%</span
          >
        </div>
        <div class="track-win">
          <p>{{ item.winningRate.toFixed(0) }}%</p>
          <p>{{ item.trackPlayCount }}게임</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { RecentTrackRecord } from '~/types/player-detail.ts/recent-track-record'
interface SortType {
  uid: string
  name: string
}
export default Vue.extend({
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectSortTypeIndex: 0,
      sortTypes: [
        {
          uid: 'trackPlayCount',
          name: '플레이 횟수',
        },
        {
          uid: 'track',
          name: '트랙',
        },
        {
          uid: 'top',
          name: '상위',
        },
        {
          uid: 'winningRate',
          name: '승률',
        },
      ] as SortType[],
      sortDirection: 'desc',
    }
  },
  computed: {
    tracks() {
      const tracks: RecentTrackRecord[] = this.data as RecentTrackRecord[]
      this.sortList(tracks)
      return tracks
    },
  },
  methods: {
    sortList(tracks: RecentTrackRecord[]) {
      const sortType = this.sortTypes[this.selectSortTypeIndex]
      const key = sortType.uid as keyof RecentTrackRecord
      tracks.sort(
        (left: RecentTrackRecord, right: RecentTrackRecord): number => {
          if (typeof right[key] === 'number') {
            return this.sortDirection === 'desc'
              ? +right[key] - +left[key]
              : +left[key] - +right[key]
          } else {
            return this.sortDirection === 'desc'
              ? (right[key] as string).localeCompare(left[key] as string)
              : (left[key] as string).localeCompare(right[key] as string)
          }
        }
      )
    },
  },
})
</script>
<style scoped>
.box {
  width: 280px;
  min-height: 300px;
  max-height: 550px;
  display: flex;
  flex-direction: column;
}
.header {
  padding: 8px;
  display: flex;
  flex-direction: row;
}
.menu-box {
  margin-left: auto;
  display: flex;
}
.sort-type-dropdown {
  width: 110px;
  height: 25px;
  border: 1px solid #273427;
  border-radius: 4px;
  display: flex;
  align-items: center;
  background-color: white;
  justify-content: space-between;
}
.list {
  flex: 1;
  overflow-y: scroll;
}
.track {
  width: 100%;
  height: 49px;
  display: flex;
  flex-direction: row;
}
.track-img {
  margin-left: 8px;
  width: 48px;
  height: 33px;
}
.track-info {
  flex: 2;
  padding-left: 8px;
}
.track-info-subtitle {
  color: #8b8b8b;
  font-size: 11px;
}
.track-win {
  text-align: center;
  flex: 1;
}
.header-title{
  font-size:12px;
}
</style>
