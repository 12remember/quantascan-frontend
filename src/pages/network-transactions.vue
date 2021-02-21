<template>
<div>
  <!-- begin page-header -->
  <h1 class="page-header">Number of Transactions and Volume</h1>
  <p class="page-description"> The daily number of transactions and volume on the QRL network</p>
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
  name: 'transaction',
  metaInfo: {
    titleTemplate: '%s | Daily transactions and volume on the QRL blockchain',
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "The daily average transactions and volume on The Quantum Resistant Ledger(QRL) blockchain."
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

        credits: {
          enabled: false
        },
        plotOptions: {
          series: {
            dataGrouping: {
              dateTimeLabelFormats: {
                millisecond: ['%A, %b %e, %H:%M:%S.%L', '%A, %b %e, %H:%M:%S.%L', '-%H:%M:%S.%L'],
                second: ['%A, %b %e, %H:%M:%S', '%A, %b %e, %H:%M:%S', '-%H:%M:%S'],
                minute: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
                hour: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
                day: ['%A, %b %e, %Y', '%A, %b %e', '-%A, %b %e, %Y'],
                week: ['Settimana del %d/%m/%Y', '%A, %b %e', '-%A, %b %e, %Y'],
                month: ['%B %Y', '%B', '-%B %Y'],
                year: ['%Y', '%Y', '-%Y']
              }
            }
          }
        },
        xAxis: [{

        }],

        yAxis: [{
          title: {
            enabled: true,
            text: 'Number of Transactions'
          },
          opposite: false,
          labels: {
            align: 'right'
          },
          height: '80%',
          resize: {
            enabled: true
          }
                }, {
          labels: {
            align: 'left'
          },
          top: '80%',
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
            const total_number_of_transactions_coinbase = this.points[0].y.toFixed(0)
            const total_number_of_transactions_transfer = this.points[1].y.toFixed(0)
            const total_number_of_transactions_slave = this.points[2].y.toFixed(0)

            const total_amount_transfered_coinbase = this.points[3].y / 1000000000
            const total_amount_transfered_coinbase_split = total_amount_transfered_coinbase.toFixed(9).split('.')
            const total_amount_transfered_coinbase_split_quanta = total_amount_transfered_coinbase_split[0].toString().replace(
              /\B(?=(\d{3})+(?!.))/g, ",")

            let total_amount_transfered_transfer_split_quanta
            if (this.points[4] != undefined) {
              const total_amount_transfered_transfer = this.points[4].y / 1000000000
              const total_amount_transfered_transfer_split = total_amount_transfered_transfer.toFixed(9).split('.')
              total_amount_transfered_transfer_split_quanta = total_amount_transfered_transfer_split[0].toString().replace(
                /\B(?=(\d{3})+(?!.))/g, ",")
            }

            let dateFormat
            if (this.points[0].series.currentDataGrouping != undefined) {
              if (this.points[0].series.currentDataGrouping.unitName == 'week') {
                dateFormat = Highcharts.dateFormat('In the week of %e %B %Y', date)
              } else {
                dateFormat = Highcharts.dateFormat('%e %B %Y', date)
              }
            } else {
              dateFormat = Highcharts.dateFormat('%e %B %Y', date)
            }




            const tooltipText =
              dateFormat + '<br/>' +
              '<b>Number of Transactions</b>' + '<br/>' +
              'Coinbase: ' + total_number_of_transactions_coinbase + '<br/>' +
              'Transfer: ' + total_number_of_transactions_transfer + '<br/>' +
              'Slave: ' + total_number_of_transactions_slave + '<br/>' +
              '<b>Transaction volume</b> (Quanta)' + '<br/>' +
              'Coinbase: ' + total_amount_transfered_coinbase_split_quanta + '<br/>' +
              'Transfer: ' + total_amount_transfered_transfer_split_quanta + '<br/>'
            return tooltipText



          },

        },
        series: [
          {
            type: 'spline',
            name: 'Number of Transactions coinbase',
            data: []
          },
          {
            type: 'spline',
            name: 'Number of Transactions transfers',
            data: []
          },
          {
            type: 'spline',
            name: 'Number of Transactions slave',
            data: []
          },
          {
            type: 'column',
            name: 'Transaction Volume',
            data: [],
            yAxis: 1
            },
          {
            type: 'column',
            name: 'Transaction Volume',
            data: [],
            yAxis: 1
          }

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
    axios.get('api/network-transactions')
      .then(response => {
        const data = response.data
        const chartDataCoinbase = data.chart_data_point_list_coinbase
        const chartDataTransfer = data.chart_data_point_list_transfer
        const chartDataSlave = data.chart_data_point_list_slave

        let i = 0
        let dataLength = chartDataCoinbase.length
        for (i; i < dataLength; i += 1) {
          this.chartOptions.series[0].data.push({
              "x": chartDataCoinbase[i].date,
              "y": chartDataCoinbase[i].total_number_of_transactions,
            }),

            this.chartOptions.series[3].data.push({
              "x": chartDataCoinbase[i].date,
              "y": chartDataCoinbase[i].total_amount_transfered,
            })
        }


        let i2 = 0
        let dataLength2 = chartDataTransfer.length
        for (i2; i2 < dataLength2; i2 += 1) {
          this.chartOptions.series[1].data.push({
            "x": chartDataTransfer[i2].date,
            "y": chartDataTransfer[i2].total_number_of_transactions,
          })
          this.chartOptions.series[4].data.push({
            "x": chartDataTransfer[i2].date,
            "y": chartDataTransfer[i2].total_amount_transfered,
          })
        }

        let i3 = 0
        let dataLength3 = chartDataSlave.length
        for (i3; i3 < dataLength3; i3 += 1) {
          this.chartOptions.series[2].data.push({
            "x": chartDataSlave[i3].date,
            "y": chartDataSlave[i3].total_number_of_transactions,
          })
        }



        //this.generalStats = data.general_stats
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