<template>
  <div class="search-bar">
    <div
      v-if="recentSearch && recentSearches.length > 0"
      class="recent-search-box"
    >
      <p class="pt-2 pl-3 has-text-gray is-size-7">최근 전적 검색한 라이더</p>
      <div class="columns is-multiline is-flex">
        <div
          v-for="(nickname, i) in recentSearches"
          :key="i"
          class="column is-4 is-6-mobile"
        >
          <a @click="search(nickname)"> {{ nickname }}</a>
          <Icon
            icon="ri-close-line"
            class="is-clickable recent-search-item-remove"
            color="#4a4a4a"
            :width="19"
            :height="19"
            @click.native="removeRecentSearch(nickname)"
          />
        </div>
      </div>
    </div>
    <div class="input-box">
      <b-input
        ref="inputBar"
        v-model="inputValue"
        placeholder="라이더명을 입력해주세요."
        custom-class="input"
        icon-right="icon--search"
        icon-right-clickable
        :maxlength="12"
        :has-counter="false"
        @keyup.enter.native="search(inputValue)"
        @icon-right-click="search(inputValue)"
        @focus="handleFocus"
        @blur="handleFocusOut"
      />
    </div>
    <div
      v-show="isExpandAutocomplete && autocomplete && 0 < autocompletes.length"
      class="autocomplete-box"
    >
      <ul>
        <!--
           click대신 mousedown을 사용하는 이유은 해당 이벤트가 위 input에서 Focusout보다 먼저 이벤트가 발생되기 때문임
        -->
        <li
          v-for="(item, i) in autocompletes"
          :key="i"
          class="autocomplete-item"
          @mousedown="search(item.nickname)"
        >
          <img
            class="autocomplete-item-character"
            :src="`${$config.metadataUrl}character/${item.characterHash}.png`"
            alt="마지막으로 사용한 캐릭터"
            @error="CharacterNotFound"
          />
          <span class="autocomplete-item-nickname">{{ item.nickname }}</span>
          <span class="autocomplete-item-license">
            <LicenseBadge
              :license="item.license"
              :racing-master-emblem="item.racingMasterEmblem"
            />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Autocomplete } from '~/types/autocomplete'
import { CharacterNotFound } from '~/helpers/callback'
export default Vue.extend({
  props: {
    size: {
      type: String,
      required: false,
      default: '',
    } as PropOptions<String>,
    recentSearch: {
      type: Boolean,
      required: false,
      default: true,
    } as PropOptions<Boolean>,
    autocomplete: {
      type: Boolean,
      required: false,
      default: true,
    } as PropOptions<boolean>,
  },
  data() {
    return {
      inputValue: '',
      autocompletes: [] as Autocomplete[],
      isExpandAutocomplete: true,
    }
  },
  computed: {
    recentSearches(): string[] {
      return this.$accessor.recentSearch.get
    },
  },
  watch: {
    inputValue(nickname: string): void {
      if (nickname.length === 0) {
        this.autocompletes = []
        return
      }
      this.$api
        .getAutocomplete(nickname)
        .then((res) => (this.autocompletes = res))
    },
  },
  methods: {
    CharacterNotFound,
    removeRecentSearch(nickname: string): void {
      this.$accessor.recentSearch.removeNickname(nickname)
    },
    search(nickname: string): void {
      if (nickname.length === 0) {
        return
      }
      this.$router.push({ name: 'rider-nickname', params: { nickname } })
      // this.$accessor.recentSearch.add(nickname)
      // TODO: 라이더페이지에서 정상적인 유저면 추가해야 한다.
    },
    handleFocus() {
      if (this.autocomplete && this.autocompletes.length > 0) {
        this.isExpandAutocomplete = true
      }
    },
    handleFocusOut() {
      if (this.autocomplete && this.autocompletes.length > 0) {
        this.isExpandAutocomplete = false
      }
    },
  },
})
</script>
<style scoped>
::v-deep .input::placeholder {
  color: hsl(0, 0%, 48%);
  font-size: 14px;
}
::v-deep .input:focus {
  border-color: transparent;
  box-shadow: none;
}
::v-deep .input {
  box-shadow: none;
  color: hsl(0, 0%, 21%);
  line-height: 20px;
  border: none;
  font-size: 14px;
  padding-top: 7.5px;
  padding-bottom: 7.5px;
  padding-left: 16px;
  caret-color: hsl(0, 0%, 21%);
}
::v-deep .input-box .icon {
  padding-right: 1rem;
  height: 100% !important;
}
/* ri-search-line */
::v-deep .icon--search {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='40' height='40'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z' fill='rgba(255,99,132,1)'/%3E%3C/svg%3E");
}
.input-box {
  padding-bottom: 0.75rem;
  padding-top: 0.5rem;
  flex: 1;
}
.recent-search-box {
  border-bottom: solid 1px #efefef;
}
.columns {
  margin-top: 0rem;
  margin-left: 0rem;
  margin-right: 0rem;
  padding-bottom: 1rem;
}
.recent-search-item-remove {
  vertical-align: middle;
  float: right;
}
.autocomplete-box {
  border-top: solid 1px #efefef;
  /* z-index: 10;
  position: absolute; */
  background-color: white;
  width: 410px;
}
.autocomplete-item:hover {
  cursor: pointer;
  background-color: #f9f9f9;
}
.autocomplete-item {
  padding: 0.7rem 0.2rem 0.7rem 0.2rem;
}
.autocomplete-item-character {
  vertical-align: middle;
  width: 60px;
}
.autocomplete-item-license {
  padding-left: 5px;
  color: gray;
  font-size: 12px;
}
.search-bar {
  background: white;
  border-radius: 2px;
  width: 410px;
}
@media screen and (max-width: 420px) {
  .search-bar,
  .autocomplete-box {
    width: 300px;
  }
  .autocomplete-item {
    padding: 0.3rem 0.2rem 0.3rem 0.2rem;
  }
}
@media screen and (min-width: 769px) {
  .search-bar,
  .autocomplete-box {
    width: 560px;
  }
}
</style>
