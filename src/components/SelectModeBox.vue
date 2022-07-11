<template>
  <div class="mode-box">
    <div
      class="mode-box-item"
      :class="{ selected: value === 'all' }"
      @click="changeValue('all')"
    >
      All
    </div>
    <div
      class="mode-box-item"
      :class="{ selected: value === 'item' }"
      @click="changeValue('item')"
    >
      <img :src="require('@/static/img/물풍선@5x.png')" alt="물풍선" />
    </div>
    <div
      class="mode-box-item"
      :class="{ selected: value === 'speed' }"
      @click="changeValue('speed')"
    >
      <img :src="require('@/static/img/부스터@5x.png')" alt="부스터" />
    </div>
    <div
      class="mode-box-item"
      :class="{ selected: value === 'etc' }"
      @click="changeValue('etc')"
    >
      Etc
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SelectModeBox',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    changeValue(newValue: 'all' | 'item' | 'speed' | 'etc') {
      this.$emit('input', newValue)
    },
  },
})
</script>
<style scoped>
.mode-box {
  border: 1px solid #272c34;
  border-radius: 4px;
  display: flex;
}
.mode-box-item {
  width: 24px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.selected {
  background-color: #ff6384;
}
.mode-box-item:not(:last-of-type) {
  border-right: 1px solid #272c34;
}
</style>
