<template>
  <div class="top-box">
    <div class="box p-3">
      <p>
        프로게이머, 스트리머 등 등록된 인플루언서는
        <strong class="is-size-6">{{ influencerList.length }}</strong
        >명 입니다.
      </p>
      <a
        target="_blank"
        href="https://docs.google.com/forms/d/1XSs76X_stfo1yXl_Dn8h1GcTajDk2ItC-HY69C3JtsM"
        >정보 변경/추가 요청</a
      >
    </div>
    <div class="box">
      <div class="filter-box">
        <span class="has-text-grey-dark">필터</span>
        <div class="filter-list">
          <b-tag
            rounded
            class="is-clickable"
            :class="{ 'filter--active': filterType === 'all' }"
            @click="filterType = 'all'"
            >전체</b-tag
          >
          <b-tag
            rounded
            class="is-clickable"
            :class="{ 'filter--active': filterType === 'programer' }"
            @click="filterType = 'programer'"
            >프로게이머</b-tag
          >
          <b-tag
            rounded
            class="is-clickable"
            :class="{ 'filter--active': filterType === 'streamer' }"
            @click="filterType = 'streamer'"
            >스트리머</b-tag
          >
                    <b-tag
            rounded
            class="is-clickable"
            :class="{ 'filter--active': filterType === 'manager' }"
            @click="filterType = 'manager'"
            >감독</b-tag
          >
        </div>
      </div>
    </div>
    <div class="box">
      <b-input
        v-model="input"
        placeholder="선수, 인플루언서 이름 (전대웅, scamper중선s)"
        class="input-box"
      ></b-input>
    </div>
    <div class="box">
      <div
        class="columns is-multiline is-justify-content-center is-flex-mobile"
      >
        <div
          v-for="influencer in filter"
          :key="influencer.accessid"
          class="column is-2 is-5-mobile influencer-info"
        >
          <nuxt-link
            :to="{
              name: 'rider-nickname',
              params: { nickname: influencer.nickname },
            }"
            class="influencer-info-nickname"
          >
            {{ influencer.nickname }}
          </nuxt-link>
          <p class="influencer-info-description">
            {{ influencer.description }}
          </p>
          <b-tooltip
            label="마지막으로 닉네임이 변경된 시간입니다."
            position="is-top"
          >
            <p class="has-text-grey is-size-7 is-underlined">
              {{ $dayjs(influencer.lastUpdated).format('YYYY-MM-DD HH:mm') }}
            </p>
          </b-tooltip>
          <div class="external-link-box">
            <a
              v-if="
                influencer.twitchLink !== null && influencer.twitchLink !== ''
              "
              :href="influencer.twitchLink"
              target="_blank"
            >
              <Icon
                :icon="'ri-twitch-fill'"
                :width="18"
                :height="18"
                :color="'#6441a5'"
              />
            </a>
            <a
              v-if="
                influencer.youtubeLink !== null && influencer.youtubeLink != ''
              "
              :href="influencer.youtubeLink"
              target="_blank"
            >
              <Icon
                :icon="'ri-youtube-line'"
                :width="18"
                :height="18"
                :color="'#FF0000'"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import { Influencer } from '~/types/influencer'
export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      influencerList: [] as Influencer[],
      filterType: 'all' as 'all' | 'programer' | 'streamer' | 'manager',
      input: '',
    }
  },
  head(): MetaInfo {
    return this.$seo({
      title: '프로, 인플루언서 리스트',
      description: 'BAZZI.GG에 등록된 프로, 인플루언서를 확인해보세요.',
    })
  },
  computed: {
    filter(): Influencer[] {
      let list: Influencer[] = this.influencerList
      if (this.filterType === 'programer') {
        list = list.filter(
          (item) => item.keywords.findIndex((p) => p === '프로게이머') !== -1
        )
      } else if (this.filterType === 'streamer') {
        list = list.filter(
          (item) => item.keywords.findIndex((p) => p === '스트리머') !== -1
        )
      } else if(this.filterType === 'manager'){
        list = list.filter(
          (item) => item.keywords.findIndex((p) => p === '감독') !== -1
        )
      }
      if (this.input.length > 0) {
        list = list.filter(
          (item) =>
            item.nickname.startsWith(this.input) ||
            item.keywords.findIndex((p) => p.startsWith(this.input)) !== -1
        )
      }
      return list
    },
  },
  async created() {
    this.influencerList = await this.$api.getInfluencerList()
  },
})
</script>

<style scoped>
.box {
  margin-top: 16px;
  margin-bottom: 8px;
}
.filter-box {
  padding: 8px;
}
.filter-list {
  margin-left: 16px;
  display: inline;
}
.filter--active {
  background-color: #272c34;
  color: white;
}
.columns {
  margin: 0;
}
.influencer-info {
  margin: 8px;
  background-color: #f7f7f9;
}
.influencer-info-nickname {
  font-size: 22px;
  color: black;
}
.influencer-info-nickname:hover {
  color: black;
  text-decoration: underline;
}
.influencer-info-nickname:visited {
  color: black;
}
.influencer-info-description {
  color: 808080;
  font-size: 12px;
}
.external-link-box {
  padding-top: 4px;
}
.input-box {
  padding: 8px;
}
.input-box >>> input {
  box-shadow: none;
  border-radius: 0;
  caret-color: hsl(0, 0%, 21%);
  background: #f7f7f9;
}
.input-box >>> input::placeholder {
  color: hsl(0, 0%, 48%);
}
@media screen and (max-width: 768px) {
  .top-box {
    padding: 8px;
  }
}
</style>
