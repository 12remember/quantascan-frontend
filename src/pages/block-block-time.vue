<template>
<div>
  <!-- begin page-header -->
  <h1 class="page-header">Average Block Time</h1>
  <p class="page-description"> The daily average block time in seconds</p>
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
        <div class="note note-warning" v-if="showNotification">
          <div class="note-icon">
            <v-icon name="exclamation" scale="4" />
          </div>
          <div class="note-content">
            <h4><b>Displayed Graph has Issues</b></h4>
            <p>The graph below has some issues. Some peaks in blocktime found is probably due to the change from winter to summertime </p>
          </div>
        </div>
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
  name: 'blockTime',
  metaInfo: {
    titleTemplate: '%s | Daily Average Block Time',
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "The daily average block time of the Quanta Secure Ledger(QRL) blockchain, since the release of the QRL mainnet."
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
      showNotification: false,
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
            text: 'Time in Seconds'
          },
          opposite: false,
          labels: {
            align: 'right',
            formatter: function () {
              return this.value + ' s'
            },
            height: '100%',
            resize: {
              enabled: true
            }
          }
          }],
        tooltip: {
          shared: false,
          split: false,
          valueDecimals: 0,
          formatter: function () {
            const date = this.x

            const tooltipText =
              Highcharts.dateFormat('%e %B %Y', date) + '<br/>' +
              '<b>Blocktime</b>' + '<br/>' +
              'Average: ' + this.y + ' s' + '<br/>' +
              'Min: ' + this.point.block_timestamp_seconds_min + ' s' + '<br/>' +
              'Max: ' + this.point.block_timestamp_seconds_max + ' s' + '<br/>' +
              'Total Blocks Found ' + this.point.block_number_count
            return tooltipText

          },
        },
        series: [
          {
            type: 'spline',
            name: 'Average Blocktime',
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

  computed: {},

  methods: {},

  created() {

    this.isLoading.chart = true
    axios.get('api/block-block-time')
      .then(response => {
        const data = response.data
        const chartData = data.chart_data_point_list
        let i = 0
        let dataLength = chartData.length
        for (i; i < dataLength; i += 1) {
          this.chartOptions.series[0].data.push({
            "x": chartData[i].date,
            "y": chartData[i].block_timestamp_seconds_mean,
            "block_timestamp_seconds_min": chartData[i].block_timestamp_seconds_min,
            "block_timestamp_seconds_max": chartData[i].block_timestamp_seconds_max,
            "block_number_count": chartData[i].block_number_count
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