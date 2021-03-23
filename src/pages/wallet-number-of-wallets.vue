<template>
<div>
  <!-- begin page-header -->
  <h1 class="page-header">Number of Wallets</h1>
  <p class="page-description">Total number of wallets and daily new wallets </p>
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

  name: 'numberOfWallets',
  metaInfo: {
    titleTemplate: '%s | Number of QRL wallets growth',
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Daily number of new wallets of The Quantum Resistant Ledger(QRL) blockchain."
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
          title: {
            enabled: true,
            text: 'Number of Wallets'
          },
          opposite: false,
          labels: {
            align: 'right',
          },
          height: '100%',
          min: 0,
          resize: {
            enabled: true
          },

          }],
        tooltip: {
          shared: false,
          split: false,
          valueDecimals: 0,

          formatter: function () {
            const date = this.x

            const tooltipText =
              Highcharts.dateFormat('%e %B %Y', date) + '<br/>' +
              '<b>Wallets</b>' + '<br/>' +
              'Total: ' + this.y + '<br/>' +
              '+ ' + this.point.dailyNewWalletsFound + ' Wallets' + '<br/>'

            return tooltipText
          },


        },
        series: [
          {
            type: 'spline',
            name: 'Number of Wallets',
            data: [],
            turboThreshold: 5000,
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

  },

  methods: {

  },

  created() {

    this.isLoading.chart = true
    axios.get('api/wallet-number-of-wallets')
      .then(response => {
        const data = response.data
        const chartData = data.chart_data_point_list
        let i = 0
        let dataLength = chartData.length
        for (i; i < dataLength; i += 1) {
          this.chartOptions.series[0].data.push({
            "x": chartData[i].date, //date
            "y": chartData[i].total_number_of_wallet, //total_wallet_found,
            "dailyNewWalletsFound": chartData[i].daily_new_wallets_found,
          })
        }
        this.isLoading.chart = false

      })
      .catch(error => {
        console.log(error)
        this.hasError.chart = true
      })
      .finally(() => this.isLoading.chart = false)
  }
}
</script>