<template>
<div>
  <!-- begin page-header -->
  <h1 class="page-header">The Quantum Ledger Wallet Distribution</h1>
  <p class="page-description">Quanta distribution by percentile</p>
  <!-- end page-header -->

  <!-- begin row -->
  <div class="row">
    <!-- begin col-12 -->
    <div class="col-xl-12">
      <template v-if="isLoading.chart">
        <div class="d-flex align-items-center min-h-400">
          <loading-spinner-dot class="center" :animation-duration="1000" :dot-size="55" color="var(--qrl-tertaire)" />
        </div>
      </template>
      <template v-else>
        <div id="chart">
          <Highcharts class="chart" :constructor-type="'chart'" :options="chartOptions" :updateArgs="updateArgs" ref="chart">
          </Highcharts>
        </div>
      </template>
    </div>
    <!-- end col-12 -->
  </div>
  <!-- end row -->

  <!-- begin row -->
  <div class="row p-t-40 p-b-40">
    <!-- begin col-12 -->
    <div class="col-xl-12 d-flex flex-wrap justify-content-between">
      <!-- begin col-6 -->
      <div class="col-xl-6 col-md-10 col-sm-12 d-flex flex-column justify-content-between p-b-40">
        <template v-if="isLoading.sliderPercentage">
          <div class="d-flex align-items-center min-h-400">
            <loading-spinner-dot class="center" :animation-duration="1000" :dot-size="55" color="var(--qrl-tertaire)" />
          </div>
        </template>
        <template v-else>
          <span style=" font-size:20px">Wallets Top <span style="color:var(--qrl-tertaire)">{{sliderOptionsPercentageOwned.value}} %</span></span>
          <div class="d-flex flex-wrap ">
            <span style="font-size:20px ;" class="p-r-5 ">Possess </span>
            <span style="font-size:20px ; color:var(--qrl-tertaire)">
              {{formatToReadablePercentage(sliderDistributionPercentage.percentageOwned).forDot}}.
            </span>
            <span style=" font-size:12px" class="p-r-5">{{formatToReadablePercentage(sliderDistributionPercentage.percentageOwned).afterDot}}</span>
            <span style="font-size:20px ;"> % of circulating Quanta</span>
          </div>
          <span style="font-size:20px ;">A total of {{sliderDistributionPercentage.volumnOwned}}</span>
          <div class="p-20">
            <vue-slider v-bind="sliderOptionsPercentageOwned" v-model="sliderOptionsPercentageOwned.value" :tooltip-formatter="tooltipFormatter1"
              :marks="marksSlider1" :tooltip-placement="['bottom']">
            </vue-slider>
          </div>
        </template>
      </div>
      <!-- end col-6 -->
      <!-- begin col-6 -->
      <div class="col-xl-6 col-md-10 col-sm-12 d-flex flex-column justify-content-between p-b-40">
        <template v-if="isLoading.sliderPercentage">
          <div class="d-flex align-items-center min-h-400">
            <loading-spinner-dot class="center" :animation-duration="1000" :dot-size="55" color="var(--qrl-tertaire)" />
          </div>
        </template>
        <template v-else>
          <span style="font-size:20px ;" class="p-r-5 ">There are <span
              style="font-size:20px ; color:var(--qrl-tertaire)">{{getNumberOfWalletHoldingX.count}}</span> Wallets</span>
          <span style="font-size:20px ;">That have <span
              style="font-size:20px ; color:var(--qrl-tertaire)">{{sliderOptionsWalletsHoldingX.value}}</span> or more Quanta</span>
          <div class="p-20">
            <vue-slider ref="slider" v-bind="sliderOptionsWalletsHoldingX" v-model="sliderOptionsWalletsHoldingX.value"
              :tooltip-formatter="tooltipFormatter2" :tooltip-placement="['bottom']" :data="sliderOptionsWalletsHoldingX.data" :data-value="'amount'"
              :data-label="'amount'">
            </vue-slider>
          </div>
        </template>
      </div>
      <!-- end col-6 -->
    </div>
    <!-- end col-12 -->
  </div>
  <!-- end row -->

</div>
</template>

<script>
import axios from 'axios'

export default {

  name: 'walletDistribution',
  metaInfo: {
    titleTemplate: '%s | Distribution of Quanta in QRL wallets',
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Quanta distribution of The Quantum Resistant Ledger(QRL) blockchain."
        },
      ],
  },


  data() {
    return {
      isLoading: {
        chart: false,
        sliderPercentage: false
      },
      hasError: {
        chart: false,
        sliderPercentage: false
      },
      updateArgs: [true, true, true],
      distributionByPercentage: {
        percentageOwned: [],
        volumnOwned: []
      },
      tooltipFormatter1: '{value} %',
      tooltipFormatter2: '{value}+ Quanta',
      marksSlider1: {
        '0.1': '0 %',
        '100': '100 %',
      },
      sliderOptionsPercentageOwned: {
        value: 5,
        min: 0.1,
        max: 100,
        interval: 0.1,
        useKeyboard: true,
        height: '30px',
        dotSize: '30px',
        tooltip: 'always',
      },
      sliderOptionsWalletsHoldingX: {
        data: [],
        value: '100',
        height: '30px',
        dotSize: '30px',
        useKeyboard: true,
        tooltip: 'always',
      },
      chartOptions: {
        chart: {
          styledMode: true,
          type: 'area'
        },
        title: {
          text: ''

        },
        credits: {
          enabled: false
        },
        xAxis: {
          title: {
            text: 'Percentile of Quanta Wallets '
          },
          allowDecimals: false,
          categories: [],
          labels: {
            formatter: function () {
              return this.value;
            }
          },

        },
        yAxis: {
          title: {
            text: 'Total Quanta'
          },
          labels: {
            formatter: function () {
              const quanta = this.value / 1000000000
              const readableValue = quanta.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              return readableValue

            }
          },
        },
        plotOptions: {
          area: {
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          }
        },

        legend: {
          enabled: false,

        },
        tooltip: {
          shape: 'square',
          headerShape: 'callout',
          borderWidth: 0,
          shadow: false,
          valueDecimals: 4,
          formatter: function () {
            const quanta_w_shor = this.y / 1000000000
            const quanta = quanta_w_shor.toFixed(10).split('.')

            if (quanta[0] >= 1 && quanta[0] < 100) {
              const labeltext =
                'Percentile ' + this.x + '<br/>' +
                quanta_w_shor.toFixed(4) + ' Quanta'
              return labeltext;
            } else if (quanta[0] < 1) {
              const labeltext =
                'Percentile ' + this.x + '<br/>' +
                quanta_w_shor.toFixed(6) + ' Quanta'
              return labeltext;
            } else {
              let readableValue = quanta[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              const labeltext =
                'Percentile ' + this.x + '<br/>' +
                readableValue + ' Quanta'
              return labeltext;
            }

          }
        },
        series: [{
          data: []
               }]

      }

    };
  },



  computed: {
    sliderDistributionPercentage() {
      const startPercentage = 1000 - this.sliderOptionsPercentageOwned.value * 10
      const selectInList_percentageOwned = this.distributionByPercentage.percentageOwned.slice(startPercentage, 1000)
      const selectInList_volumnOwned = this.distributionByPercentage.volumnOwned.slice(startPercentage, 1000)
      const percentageOwned = selectInList_percentageOwned.reduce((a, b) => a + b, 0)
      const volumnOwned = this.formatToReadableNumberWithoutShor(selectInList_volumnOwned.reduce((a, b) => a + b, 0))

      return {
        'percentageOwned': percentageOwned,
        'volumnOwned': volumnOwned
      }

    },

    getNumberOfWalletHoldingX() {
      let targetIndex = this.sliderOptionsWalletsHoldingX.data.find(item => item.amount === this.sliderOptionsWalletsHoldingX.value);
      if (targetIndex == undefined) {
        let targetIndex = 0
        return targetIndex
      }
      return targetIndex

    }


  },



  methods: {
    formatToReadableNumberWithoutShor(volNum) {
      const number = volNum / 1000000000
      const number_split = number.toFixed(9).split('.')
      const number_split_quanta = number_split[0].toString().replace(/\B(?=(\d{3})+(?!.))/g, ",")
      return number_split_quanta + ' Quanta';

    },
    formatPercentage(number) {
      return number.toFixed(2) + ' %'

    },

    formatToReadablePercentage(perct) {
      const perctSplit = perct.toFixed(12).toString().split('.')
      return {
        forDot: perctSplit[0],
        afterDot: perctSplit[1]
      }
    }
  },

  created() {
    this.isLoading.chart = true
    this.isLoading.sliderPercentage = true
    axios.get('api/wallet-distribution')
      .then(response => {
        this.chartOptions.series[0].data = response.data.distribution_percentile.address_balance_list
        this.chartOptions.xAxis.categories = response.data.distribution_percentile.address_balance_group_list
        this.distributionByPercentage.percentageOwned = response.data.distribution_percentage.percentage_owned
        this.distributionByPercentage.volumnOwned = response.data.distribution_percentage.volume_owned
        this.sliderOptionsWalletsHoldingX.data = response.data.distribution_wallets_holding_x

        this.isLoading.chart = false
        this.isLoading.sliderPercentage = false
      })
      .catch(error => {
        console.log(error)
        this.hasError.chart = true
        this.hasError.sliderPercentage = true
      })
      .finally(() => {
        this.isLoading.chart = false
        this.isLoading.sliderPercentage = false
      })


  },

}
</script>