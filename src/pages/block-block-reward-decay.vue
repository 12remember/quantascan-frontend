<template>
<div>
  <!-- begin page-header -->
  <h1 class="page-header">Block Reward Decay</h1>
  <p class="page-description"> Mean block reward for miners</p>


  <!-- end page-header -->

  <!-- begin row -->
  <div class="row">
    <!-- begin panel -->

    <div class="col-xl-12">
      <template v-if="isLoading.chart">
        <div class="d-flex align-items-center min-h-400">
          <loading-spinner-dot class="center" :animation-duration="1000" :dot-size="55" color="var(--qrl-tertaire)" />
        </div>
      </template>
      <template v-else>
        <div id="chart">
          <Highcharts class="chart" :constructor-type="'stockChart'" :options="chartOptions" :updateArgs="updateArgs" ref="chart">
          </Highcharts>
        </div>
      </template>
    </div>
    <!-- end panel -->
  </div>
  <!-- end row -->
</div>
</template>

<script>
import axios from 'axios'
import Highcharts from "highcharts";


export default {
  name: 'blockRewardDecay',
  metaInfo: {
    titleTemplate: '%s | Daily Average Block Reward',
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "The daily average block reward of the Quanta Secure Ledger(QRL) blockchain, since the release of the QRL mainnet."
      },
    ],
  },


  data() {
    return {
      isLoading: {
        chart: false,
      },
      hasError: {
        chart: false,
      },
      updateArgs: [true, true, true],
      generalStats: {},
      chartOptions: {
        chart: {
          styledMode: true,
          height: 500,
        },
        navigator: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          series: {}
        },
        xAxis: [{
          resize: {
            enabled: false
          }
        }],

        yAxis: [{
          title: {
            enabled: true,
            text: 'Block Reward'
          },
          opposite: false,
          labels: {
            align: 'right'
          },
          height: '100%',
          resize: {
            enabled: true
          }
                }, {
          labels: {
            align: 'left'
          },
          top: '100%',
          height: '20%',
          offset: 0,

          }],
        tooltip: {
          shared: true,
          split: false,
          valueDecimals: 0,
          useHTML: true,

          formatter: function () {
            const date = this.x
            let dateFormat
            if (this.y.currentDataGrouping != undefined) {
              if (this.y.currentDataGrouping.unitName == 'week') {
                dateFormat = Highcharts.dateFormat('In the week of %e %B %Y', date)
              } else {
                dateFormat = Highcharts.dateFormat('%e %B %Y', date)
              }
            } else {
              dateFormat = Highcharts.dateFormat('%e %B %Y', date)
            }

            let expected_avg_reward
            let avg_block_reward
            if (this.points[1] != undefined) {
              expected_avg_reward = this.points[1].y.toFixed(10)
              avg_block_reward = this.points[0].y.toFixed(10)
            } else {
              expected_avg_reward = this.points[0].y.toFixed(10)

            }

            if (this.points[1] != undefined) {
              const tooltipText =
                dateFormat + '<br/>' +
                '<b>Block Reward </b>' + '<br/>' +
                'Real Average Reward: ' + avg_block_reward + '<br/>' +
                'Expected Average Reward: ' + expected_avg_reward + '<br/>'
              return tooltipText
            } else {
              const tooltipText =
                dateFormat + '<br/>' +
                '<b>Block Reward </b>' + '<br/>' +
                'Expected Average Reward: ' + expected_avg_reward + '<br/>'
              return tooltipText

            }





          },

        },
        series: [{
            type: 'spline',
            name: 'Daily Reward Mean',
            data: [],
            //axis: 2,
            zIndex: 1,
          },
          {
            type: 'spline',
            name: 'Predicted Daily Reward Mean',
            data: [],
            turboThreshold: 1000000,
            //axis: 1,
            zIndex: 0,
            },

        ],
        responsive: {
          rules: [{
            condition: {
              maxWidth: 800
            },
            chartOptions: {
              rangeSelector: {
                inputEnabled: false
              },
              navigator: {
                enabled: false
              }
            }
        }]
        }
      }
    };
  },

  computed: {
    formatMaxVolumeToReadableNumberWithoutShor() {
      const number = this.generalStats.highest_total_amount_transfered_all_volum / 1000000000
      const number_split = number.toFixed(9).split('.')
      const number_split_quanta = number_split[0].toString().replace(/\B(?=(\d{3})+(?!.))/g, ",")
      return number_split_quanta + ' Quanta';

    },

  },

  methods: {

  },

  created() {

    this.isLoading.chart = true
    axios.get('api/block-reward-decay')
      .then(response => {
        const data = response.data
        const chartDataList = data.chart_data_point_list
        let i = 0
        let dataLength = chartDataList.length
        for (i; i < dataLength; i += 1) {
          this.chartOptions.series[0].data.push({
            "x": chartDataList[i].date,
            "y": chartDataList[i].block_reward_block_mean,
          })
        }

        const chartDataListPrediction = data.chart_data_point_list_prediction
        let i2 = 0
        let dataLength2 = chartDataListPrediction.length
        for (i2; i2 < dataLength2; i2 += 1) {
          this.chartOptions.series[1].data.push({
            "x": chartDataListPrediction[i2].date,
            "y": chartDataListPrediction[i2].block_reward_block_mean,
          })
        }


      })
      .catch(error => {
        console.log(error)
        this.hasError.chart = true
      })
      .finally(() => this.isLoading.chart = false)
  }
}
</script>