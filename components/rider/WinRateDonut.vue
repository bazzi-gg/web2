<template>
  <div>
    <apexchart
      :width="121"
      :height="121"
      :options="chartOptions"
      :series="[win, lose]"
    ></apexchart>
  </div>
</template>
<script lang="ts">
import Vue, { PropOptions } from 'vue'
export default Vue.extend({
  name: 'WinRateDonut',
  props: {
    win: {
      type: Number,
      required: true,
    } as PropOptions<Number>,
    lose: {
      type: Number,
      required: true,
    } as PropOptions<Number>,
    winRate: {
      type: Number,
      required: true,
    } as PropOptions<Number>,
  },
  data() {
    return {
      chartOptions: {},
    }
  },
  created() {
    this.chartOptions = {
      colors: ['#008ffb', '#ff6384'],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      labels: ['승', '패'],
      chart: {
        type: 'donut',
      },
      plotOptions: {
        pie: {
          customScale: 1.1,
          expandOnClick: false,
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                offsetY: 0,
              },
              value: {
                show: true,
                fontSize: '14px',
                offsetY: -3,
              },
              total: {
                color: '#000000',
                show: true,
                label: `${this.winRate.toFixed()}%`,
                formatter: () => {
                  return `${this.win}승 ${this.lose}패`
                },
              },
            },
          },
        },
      },
    }
  },
})
</script>
