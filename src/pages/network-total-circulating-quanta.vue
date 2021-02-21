<template>
<div>
  <!-- begin page-header -->
  <h1 class="page-header">Circulating Quanta</h1>
  <p class="page-description">Total number of circulating Quanta</p>
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

  name: 'totalCirculatingQuanta',
  metaInfo: {
    titleTemplate: '%s | Total current circulating Quanta',
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "The current circulating Quanta, since the release of the QRL mainnet."
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
          },
          height: '100%',
          min: 60000000,
          startOnTick: false,
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

            const total_amount_quanta_split = this.y.toFixed(9).split('.')
            const total_amount_quanta_split_quanta = total_amount_quanta_split[0].toString().replace(/\B(?=(\d{3})+(?!.))/g, ",")

            const total_amount_quanta_added_split = this.point.network_emission_added_quanta_daily.toFixed(9).split('.')
            const total_amount_quanta_added_split_quanta = total_amount_quanta_added_split[0].toString().replace(/\B(?=(\d{3})+(?!.))/g, ",")


            const tooltipText =
              Highcharts.dateFormat('%e %B %Y', date) + '<br/>' +
              '<b>Circulating Quanta</b>' + '<br/>' +
              'Total: ' + total_amount_quanta_split_quanta + '<br/>' +
              'Added: ' + total_amount_quanta_added_split_quanta
            return tooltipText
          },
        },
        series: [
          {
            type: 'areaspline',
            name: 'Total Quanta',
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

  },

  methods: {

  },

  created() {

    this.isLoading.chart = true
    axios.get('api/network-total-circulating-quanta')
      .then(response => {
        const data = response.data
        const chartData = data.chart_data_point_list
        let i = 0
        let dataLength = chartData.length
        for (i; i < dataLength; i += 1) {
          this.chartOptions.series[0].data.push({
            "x": chartData[i].date,
            "y": chartData[i].network_emission_total_circulating_quanta,
            "network_emission_added_quanta_daily": chartData[i].network_emission_added_quanta_daily,
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