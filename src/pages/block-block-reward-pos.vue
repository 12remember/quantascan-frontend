<template>
<div>

  <!-- begin page-header -->
  <h1 class="page-header">Proof Of Stake</h1>
  <p class="page-description">Some insight in Proof of Stake data</p>
  <div class="note note-info">
    <div class="note-icon">
      <v-icon name="exclamation" scale="4" />
    </div>
    <div class="note-content">
      <h4><b>Proof-Of-Stake In Development</b></h4>
      <p>The QRL core developers are currently developing POS protocol. Therefore the final conditions for staking are not set and are subject to
        change</p>
      <a class="" style="text-decoration: none;" href="https://www.theqrl.org/blog/project-zond-qrls-proof-of-stake-code-is-released-to-the-public/"
        target="_blank" rel="nofollow noopener">
        <p class="badge badge-info" style="font-size:14px">Read More
          <v-icon name="external-link-alt" scale="1" />
        </p>
      </a>
    </div>
  </div>
  <!-- end page-header -->

  <!-- begin row -->
  <div class="row m-t-40">
    <!-- begin stats panel -->
    <div class="col-xl-6 col-md-6 col-sm-6 d-flex align-items-stretch">
      <div class="widget widget-stats bg-qrl-widget-primary d-flex flex-fill">
        <div class="stats-icon"></div>
        <div class="stats-info">
          <h4>Wallets That Have the Ability to Stake after POS Release</h4>
          <template v-if="isLoading.generalData">
            <div class="d-flex align-items-center min-h-100">
              <loading-spinner-dot class="" :animation-duration="1000" :dot-size="20" color="var(--qrl-tertaire)" />
            </div>
          </template>
          <template v-else>
            <div class="d-flex flex-row">
              <div class="d-flex flex-wrap">
                <p>{{posGeneralData.total_wallet_staking}}</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- end stats panel -->
    <!-- begin stats panel -->
    <div class="col-xl-6 col-md-6 col-sm-6 d-flex align-items-stretch">
      <div class="widget widget-stats bg-qrl-widget-primary d-flex flex-fill">
        <div class="stats-icon"></div>
        <div class="stats-info">
          <h4>Total POS Keys</h4>
          <template v-if="isLoading.generalData">
            <div class="d-flex align-items-center min-h-100">
              <loading-spinner-dot class="" :animation-duration="1000" :dot-size="20" color="var(--qrl-tertaire)" />
            </div>
          </template>
          <template v-else>
            <div class="d-flex flex-row">
              <p>{{posGeneralData.total_dilithium_public_keys}}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- end stats panel -->
  </div>
  <!-- end row -->
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
</div>
</template>


<script>
//import PageOptions from '../config/PageOptions.vue'
import axios from 'axios'


export default {

  name: 'blockRewardPos',
  metaInfo: {
    titleTemplate: '%s | Number of QRL wallets able to stake',
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "The number of Quanta Secure Ledger(QRL) wallets able to stake after the proof-of-stake protocol is launched."
      },
    ],
  },

  data() {
    return {
      isLoading: {
        generalData: false,
        chart: false
      },
      hasError: {
        generalData: false,
        chart: false
      },

      posGeneralData: {},
      updateArgs: [true, true, true],
      chartOptions: {
        chart: {
          styledMode: true,

        },
        title: {
          text: ''

        },
        credits: {
          enabled: false
        },
        xAxis: {
          title: {
            text: 'Number of Proof-of-stake Keys'
          },
          allowDecimals: false,
          categories: [],
          labels: {
            formatter: function () {
              return this.value;
            }
          },

        },
        yAxis: [{
            title: {
              text: 'Total Wallets'
            },
            labels: {

            },
        },
          {
            title: {
              text: 'Total Keys Possesed'
            },
            labels: {

            },
            opposite: true
        },



        ],

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
          shared: true,
          formatter: function () {
            const numberOfKeys = this.x
            const numberOfWallets = this.points[0].y
            const volumeOwned = this.points[1].y

            const tooltipText =
              numberOfWallets + '<b> Wallets</b><br/>' +
              'Have each<b> ' + numberOfKeys + ' </b> POS Keys<br/>' +
              'With a Total of ' + volumeOwned
            return tooltipText
          },
        },
        series: [{
            type: 'column',
            name: 'Number of Wallets',
            data: [],
            yAxis: 0,
            turboThreshold: 5000,
            },
          {
            type: 'spline',
            name: 'Sum of POS Keys',
            data: [],
            yAxis: 1,
            turboThreshold: 5000,

          },
        ]
      }


    }
  },

  computed: {},

  methods: {

  },


  created() {

    this.isLoading.generalData = true
    this.isLoading.chart = true
    this.hasError.generalData = false
    this.hasError.chart = false

    axios.get('api/block-reward-pos', {
        params: {}
      })
      .then(response => {
        const dataGeneral = response.data
        this.posGeneralData = dataGeneral.general_pos_data
        this.chartOptions.series[0].data = dataGeneral.pos_distribution.count_of_wallets
        this.chartOptions.series[1].data = dataGeneral.pos_distribution.sum_of_wallets
        this.chartOptions.xAxis.categories = dataGeneral.pos_distribution.count_of_pos_keys
      })
      .finally(() => {
        console.log('dsfsdfsdfds')
        this.isLoading.generalData = false
        this.isLoading.chart = false
      })


  },




}
</script>
