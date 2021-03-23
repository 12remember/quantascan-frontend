<template>
<div>
  <!-- begin page-header -->
  <h1 class="page-header">Volume Of Exchange Wallets</h1>
  <p class="page-description"> The daily volume of exchange wallets</p>
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

  name: 'exchangeVolume',
  metaInfo: {
    titleTemplate: '%s | Daily volume of Exchange wallets',
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "The daily volume of transactions that where send or received by exchange wallets."
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
            text: 'Quanta'
          },
          opposite: false,
          labels: {
            align: 'right',
            formatter: function () {
              return this.value
            }
          },
          height: '100%',
          resize: {
            enabled: true
          },
          }],

        tooltip: {
          shared: false,
          split: false,
          valueDecimals: 6,

          formatter: function () {
            const date = this.x

            const tooltipText =
              Highcharts.dateFormat('%e %B %Y', date) + '<br/>' +
              '<b>Fee Paid</b>' + '<br/>' +
              'Average: ' + this.y + ' Quanta' + '<br/>' +
              'Minimal: ' + this.point.transaction_fee_min + ' Quanta' + '<br/>' +
              'Maximum: ' + this.point.transaction_fee_max + ' Quanta'
            return tooltipText
          },

        },

        series: [
          {
            type: 'column',
            name: 'Daily Volume Of Exchange Wallets',
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
    axios.get('api/network-transaction-exchange-volume')
      .then(response => {
        const data = response.data
        const chartData = data.chart_data_point_list
        let i = 0
        let dataLength = chartData.length
        for (i; i < dataLength; i += 1) {
          this.chartOptions.series[0].data.push({
            "x": chartData[i].date,
            "y": chartData[i].transaction_fee_mean,
            "transaction_fee_min": chartData[i].transaction_fee_min,
            "transaction_fee_max": chartData[i].transaction_fee_max,
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