<template>
  <div :class='className' :style='{height:height,width:width}'></div>
</template>

<script>
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts 主题

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '220px'
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');

      this.chart.setOption({
        title: {
          textStyle: {
            fontWeight: 'normal',
            color: '#20a0ff'
          },
          x: 'center',
          y: '35%'
        },
        animation: false,
        tooltip: {
          trigger: 'none'
        },
        color: ['#20a0ff', '#f1f2f7'],
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['42%', '50%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            legendHoverLink: false,
            hoverAnimation: false,
            emphasis: {
              label: {
                show: false
              }
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '0',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{ value: 120 }, { value: 60 }]
          }
        ]
      });
    }
  }
};
</script>
