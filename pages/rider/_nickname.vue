<template>
  <div class="w-100 h-100">
    <div v-if="data" class="player-detail">
      <div class="player-info">
        <div class="is-flex is-flex-direction-row is-align-items-center">
          <img
            :src="`${$config.metadataUrl}character/${data.character}.png`"
            class="character"
            @error="CharacterNotFound"
          />
          <div class="">
            <div class="is-flex is-align-items-center">
              <span class="player-nickname">{{ data.nickname }}</span>
              <!-- <Icon
              :icon="'ri-star-line'"
              :color="'#FF6384'"
              class="is-clickable"
            /> -->
            </div>
            <p class="player-license">{{ data.license }}</p>
          </div>
        </div>
        <b-button
          class="refresh-button"
          type="is-primary"
          rounded
          :loading="isButtonLoading"
          @click="refreshPlayerDetail()"
          >{{ data.lastRenewal }}</b-button
        >
      </div>
      <hr class="divider" />
      <div class="menu-box">
        <b-dropdown :disabled="mode === 'all'">
          <template #trigger>
            <button class="channel-dropdown">
              {{ selectChannelName }}
              <Icon
                :icon="'ri-arrow-down-s-fill'"
                :color="'#000000'"
                :width="24"
                :height="24"
                class="is-pulled-right"
              />
            </button>
          </template>
          <div v-if="mode === 'speed'">
            <b-dropdown-item
              v-for="item in availableChannels.speed"
              :key="item.uid"
              @click="selectChannel('speed', item.uid)"
              >{{ item.name }}</b-dropdown-item
            >
          </div>
          <div v-else-if="mode === 'item'">
            <b-dropdown-item
              v-for="item in availableChannels.item"
              :key="item.uid"
              @click="selectChannel('item', item.uid)"
              >{{ item.name }}</b-dropdown-item
            >
          </div>
          <div v-else-if="mode === 'etc'">
            <b-dropdown-item
              v-for="item in availableChannels.etc"
              :key="item.uid"
              @click="selectChannel('etc', item.uid)"
              >{{ item.name }}</b-dropdown-item
            >
          </div>
        </b-dropdown>
        <SelectModeBox v-model="mode" />
      </div>
      <div v-if="data.matches?.length == 0 && error && error.status === 202">
        <Alert :title="error.title" :subtitle="error.subtitle" />
      </div>
      <div class="player-detail-box">
        <div class="player-sidebar">
          <RecentMatchSummary
            v-if="data.recentMatchSummary?.mostPlayedTrack"
            :data="data.recentMatchSummary"
          />
          <RecentTrackRecordList
            v-if="data.recentTrackRecords?.length > 0"
            :data="data.recentTrackRecords"
          />
        </div>
        <div class="match-list-box">
          <MatchList
            v-if="data.matches"
            :key="channel"
            :data="data.matches"
            :my-access-id="data.accessId"
            :channel="channel"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { stringify } from 'querystring'
import { Context } from '@nuxt/types'
import Vue from 'vue'
import axios, { AxiosError } from 'axios'
import { MetaInfo } from 'vue-meta'
import { AvailableChannels } from '~/types/available-channels'
import { Metadata } from '~/types/metadata'
import { PlayerDetail } from '~/types/player-detail.ts'
import { CharacterNotFound } from '~/helpers/callback'
export default Vue.extend({
  name: 'RiderPage',
  async asyncData(ctx: Context) {
    const data = {
      nickname: ctx.params.nickname,
      channel: ctx.query.channel ?? 'all',
      mode: ctx.query.mode ?? 'all',
      data: {} as PlayerDetail,
      availableChannels: {},
      error: {} as { title: string; subtitle: string; status: number },
      head: { title: `${ctx.params.nickname} - 전적 검색` } as {
        title: string
        description: string
      },
    }
    try {
      data.data = await ctx.$api.getPlayerDetail(
        encodeURI(data.nickname),
        data.channel as string
      )
      ctx.$accessor.recentSearch.add(data.nickname)
      data.head.description = `${data.data.license} 라이센스 / 승률: ${data.data.recentMatchSummary.winRate}%, 승: ${data.data.recentMatchSummary.win}, 패: ${data.data.recentMatchSummary.lose}`
    } catch (e: any | AxiosError) {
      if (axios.isAxiosError(e)) {
        switch (e.response?.status) {
          case 404:
            data.error = {
              title: '해당 라이더가 존재하지 않습니다.',
              subtitle: '해당 라이더가 존재하지 않습니다.',
              status: 404,
            }
            break
          default:
            data.error = {
              title: '에러',
              subtitle: '알 수 없는 에러가 발생하였습니다.',
              status: 500,
            }
        }
        ctx.error({statusCode:data.error.status,message:data.error.title})
        data.head.description = data.error.subtitle
      }
    }
    data.availableChannels =
      (await ctx.$strapi.getAvailableChannels()) as AvailableChannels
    return data
  },
  data() {
    return {
      mode: 'all',
      nickname: '',
      selectChannelName: '전체',
      channel: '',
      availableChannels: {} as AvailableChannels,
      data: {} as PlayerDetail,
      isButtonLoading: false,
      error: {} as { title: string; subtitle: string; status: number } | null,
      head: {} as {
        title: string
        description: string
      },
    }
  },
  head(): MetaInfo {
    return this.$seo({
      title: this.head.title,
      description: this.head.description,
    })
  },
  watch: {
    mode() {
      if (this.mode === 'all') {
        this.selectChannel('all', 'all')
      }
    },
    async channel() {
      this.data = await this.$api.getPlayerDetail(
        encodeURI(this.nickname),
        this.channel as string
      )
    },
  },
  mounted() {
    this.selectChannel(
      this.mode as 'all' | 'item' | 'speed' | 'etc',
      this.channel
    )
  },
  methods: {
    CharacterNotFound,
    async refreshPlayerDetail() {
      this.error = null
      this.isButtonLoading = true
      try {
        const data = await this.$api.refreshPlayerDetail(
          this.data.nickname,
          this.channel
        )
        if (data === null) {
          this.error = {
            title: '플레이 기록 없음',
            subtitle: '조회할 수 있는 플레이 기록이 없습니다.',
            status: 202,
          }
        } else {
          this.data = data
        }
      } catch (e) {
        if (axios.isAxiosError(e) && e.response?.status === 418) {
          // eslint-disable-next-line no-console
          alert(e.response?.data)
        }
      }
      this.isButtonLoading = false
    },
    selectChannel(
      mode: 'all' | 'item' | 'speed' | 'etc',
      channelUid: string
    ): void {
      this.mode = mode
      if (mode !== 'all') {
        const metadataInfo: Metadata = this.availableChannels[mode].find(
          (x) => x.uid === channelUid
        ) as Metadata
        this.channel = metadataInfo.uid
        this.selectChannelName = metadataInfo.name
      } else {
        this.channel = 'all'
        this.selectChannelName = '전체'
      }
      if (
        this.$route.query.channel !== this.channel ||
        this.$route.query.mode !== this.mode
      ) {
        this.$router.replace({
          // to: "rider-nickname",
          query: {
            ...this.$route.query,
            channel: this.channel,
            mode: this.mode,
          },
        })
      }
    },
  },
})
</script>
<style scoped>
.player-detail {
  padding-top: 8px;
  width: 100%;
}
.character {
  width: 100px;
  height: 75px;
}
.player-info {
  padding-left: 32px;
  padding-top: 32px;
}
.player-nickname {
  font-size: 40px;
  padding-right: 8px;
  line-height: 1;
}
.player-license {
  padding-left: 4px;
  color: #808080;
}
.refresh-button {
  margin-top: 24px;
  font-size: 14px;
}
.divider {
  max-width: 1000px;
  height: 0px;
  margin-top: 23px;
  margin-bottom: 12px;
  border: 1px dashed #c4c4c4;
  transform: rotate(0.06deg);
}
.menu-box {
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
}
.channel-dropdown {
  width: 134px;
  height: 40px;
  border: 1px solid #273427;
  border-radius: 4px;
  display: flex;
  align-items: center;
  background-color: white;
  justify-content: space-between;
  padding-left: 16px;
  margin-right: 32px;
}
.menu-box >>> .dropdown-menu {
  min-width: 134px;
}
.player-detail-box {
  display: flex;
  flex-direction: row;
}
.match-list-box {
  width: 660px;
  height: 100%;
}
@media screen and (max-width: 768px) {
  .player-detail-box {
    flex-direction: column;
    align-items: center;
  }
  .player-sidebar {
    display: flex;
    justify-content: center;
  }

  .player-sidebar >>> .recent-match-summary,
  .player-sidebar >>> .recent-track-record {
    height: 300px;
  }
  .match-list-box >>> .match {
    padding: 0;
  }
  .match-list-box {
    width: 100%;
    max-width: 660px;
  }
  .match-list-box >>> .match {
    padding: 8px;
  }
  @media screen and (max-width: 578px) {
    .player-sidebar {
      flex-direction: column;
      width: 100%;
      padding: 8px;
    }
    .recent-match-summary,
    .recent-track-record {
      width: 100%;
    }
  }
}
</style>
