<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <svg :style="{ width: width + 'px', height: height + 'px', fill: color }">
    <use
      :xlink:href="require('@/assets/remixicon.symbol.svg') + `#${icon}`"
    ></use>
  </svg>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    icon: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: false,
      default: 24,
    },
    color: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: false,
      default: 24,
    },
  },
})
</script>
