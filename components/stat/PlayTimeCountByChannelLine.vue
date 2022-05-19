<template>
  <div>
    <apexchart :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
<script lang="ts">
import Vue, { PropOptions } from 'vue'
interface PlayTimeCountByChannel{
  [index: string]: number[]
}
export default Vue.extend({
  name: 'PlayTimeCountByChannelLine',
  props: {
    data: {
      type: Object,
      required: true,
    } as PropOptions<PlayTimeCountByChannel>,
  },
  data() {
    return {
      chartOptions: {},
      series: [] as any[],
    }
  },
  created() {
    this.series = this.preprocess(this.data)
    this.chartOptions = {
      chart: {
        type: 'line',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 500,
            },
          },
        },
      ],
      title: {
        text: '채널별 매치 횟수',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      stroke: {
        curve: 'smooth',
        lineCap: 'butt',
      },
      tooltip: {
        x: {
          formatter(value: number) {
            return `${value}시`
          },
        },
        y: {
          formatter(value: number) {
            return `${value}회`
          },
        },
      },
    }
  },
  methods: {
    preprocess(data: PlayTimeCountByChannel): any[] {
      const result: any[] = []
      for (const key in data) {
        result.push({ name: key, data: data[key] })
      }
      return result
    },
  },
})
</script>
