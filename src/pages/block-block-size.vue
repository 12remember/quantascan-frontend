<template>
<div>
  <!-- begin page-header -->
  <h1 class="page-header">Average Block Size</h1>
  <p class="page-description"> The daily average block size in kilobytes</p>
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
  name: 'avgBlockSize',
  metaInfo: {
    titleTemplate: '%s | Daily Average Blocksize',
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "The daily average blocksize of the Quanta Secure Ledger(QRL) blockchain in kilobytes, since the release of the QRL mainnet."
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

        xAxis: [{}],

        yAxis: [{
          title: {
            enabled: true,
            text: 'Kilobytes'
          },
          opposite: false,
          labels: {
            align: 'right',
            formatter: function () {
              const b_to_kb = this.value / 1000
              return b_to_kb + ' KB'
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
          valueDecimals: 0,

          formatter: function () {
            const date = this.x
            const y_from_b_to_kb = this.y / 1000
            const min_from_b_to_kb = this.point.block_size_min / 1000
            const max_from_b_to_kb = this.point.block_size_max / 1000

            const tooltipText =
              Highcharts.dateFormat('%e %B %Y', date) + '<br/>' +
              '<b>Blocksize</b>' + '<br/>' +
              'Average: ' + y_from_b_to_kb + ' KB' + '<br/>' +
              'Min: ' + min_from_b_to_kb + ' KB' + '<br/>' +
              'Max: ' + max_from_b_to_kb + ' KB' + '<br/>'
            return tooltipText
          },
        },

        series: [
          {
            type: 'spline',
            name: 'Average Block Size',
            data: []
          },
        ],
        responsive: {
          rules: [{
            condition: {
              maxWidth: 800
            },
            chartOptions: {
              chart: {
                height: 400
              },
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
    axios.get('api/block-block-size')
      .then(response => {
        const data = response.data
        const chartData = data.chart_data_point_list
        let i = 0
        let dataLength = chartData.length
        for (i; i < dataLength; i += 1) {
          this.chartOptions.series[0].data.push({
            "x": chartData[i].date,
            "y": chartData[i].block_size_mean,
            "block_size_min": chartData[i].block_size_min,
            "block_size_max": chartData[i].block_size_max,
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