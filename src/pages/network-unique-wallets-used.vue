<template>
<div>
  <!-- begin page-header -->
  <h1 class="page-header"> Unique Wallets Used - Work in progress</h1>
  <p class="page-description"> Daily number of wallets that sended or received any transaction, exluding coinbase transactions</p>
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


export default {
  data() {
    return {
      isLoading: {
        chart: false,
        topTransactionsList: false,
      },
      errored: false,
      updateArgs: [true, true, true],
      generalStats: {},
      chartOptions: {
        chart: {
          styledMode: true,
          height: 500,
        },

        credits: {
          enabled: false
        },
        xAxis: [{


        }],
        yAxis: [{
          labels: {
            align: 'left'
          },
          height: '100%',
          resize: {
            enabled: true
          }
                }, {
          top: '100%',
          height: '0%',
          offset: 0,

                }],
        tooltip: {
          shared: true,
          split: false,
          valueDecimals: 0,
          valueSuffix: ' s',
        },
        series: [
          {
            type: 'spline',
            name: 'Average Blocktime',
            data: []
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
      //  address_balance_float = address_balance.toFixed()
      const number = this.generalStats.highest_total_amount_transfered_all_volum / 1000000000

      const number_split = number.toFixed(9).split('.')
      const number_split_quanta = number_split[0].toString().replace(/\B(?=(\d{3})+(?!.))/g, ",")
      //const number_split_shor = number_split[1]
      return number_split_quanta + ' Quanta';

    },



  },



  methods: {
    formatToReadableNumber(balance) {
      //  address_balance_float = address_balance.toFixed()
      const number = balance / 1000000000

      const number_split = number.toFixed(9).split('.')
      const number_split_quanta = number_split[0].toString().replace(/\B(?=(\d{3})+(?!.))/g, ",")
      const number_split_shor = number_split[1]
      return number_split_quanta + '.' + number_split_shor;

    },

  },
  created() {

    this.isLoading.chart = true
    axios.get('api/network-unique-wallets-used')
      .then(response => {
        const data = response.data
        const chartData = data.chart_data_point_list
        let i = 0
        let dataLength = chartData.length
        for (i; i < dataLength; i += 1) {
          this.chartOptions.series[0].data.push({
            "x": chartData[i].date,
            "y": chartData[i].block_found_time_mean,
          })
        }

        this.isLoading.chart = false


      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }


}
</script>