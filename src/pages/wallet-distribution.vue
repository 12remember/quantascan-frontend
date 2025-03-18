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
     <!-- Wallet Categories Statistics -->
     <div class="col-xl-12 d-flex flex-wrap justify-content-between p-t-20">
      
      <template v-if="isLoading.walletCategories">
        <div class="d-flex align-items-center min-h-400">
          <loading-spinner-dot class="center" :animation-duration="1000" :dot-size="55" color="var(--qrl-tertaire)" />
        </div>
      </template>
      <template v-else>
        <h2 class="col-xl-12  statistics-title m-t-25">Wallet Categories</h2>
          
          <div class="col-xl-3 col-md-6 col-sm-12" v-for="(category, index) in walletCategoriesStats" :key="'category-'+index">
            <div class="p-20 text-left mb-4">
              <h3>{{ category.name }}</h3>
              <p class="stat-value">{{ category.count }} wallets</p>
              <div class="d-flex flex-row ">
              <p style="font-size:20px">{{formatToReadableNumberWithShor(category.totalValue).quanta}}</p>
              <p style="font-size:12px" class="p-r-5">{{formatToReadableNumberWithShor(category.totalValue).shor}}</p>
            </div>
              <p class="stat-value">{{ category.percentage }}% of total supply</p>
            </div>
                  <!-- Show button only if category is "Exchange" -->
              <template v-if="category.name === 'Exchange' && exchangeWallets.length > 0">
            <button class="btn btn-secondary mt-3" @click="showExchanges = !showExchanges">
              {{ showExchanges ? "Hide Exchange Addresses" : "Show Exchange Addresses" }}
            </button>
          </template>
    
        </div>
      </template>
    </div>

    <div class="col-xl-6">
      

       
            <div v-if="showExchanges">
            <!-- Exchange Wallets Table -->
        
              <h3 class="page-header">Known Exchange Wallets</h3>
   

              <template v-if="isLoading.exchangeWallets">
                <div class="d-flex align-items-center min-h-400">
                  <loading-spinner-dot class="center" :animation-duration="1000" :dot-size="55" color="var(--qrl-tertaire)" />
                </div>
              </template>

              <template v-else>

                <vue-good-table
                  ref='exchangeList'
                  :columns="exchangeColumns"
                  :rows="exchangeWallets"
                  :lineNumbers="false"
                  :search-options="{ enabled: false }"
                  :pagination-options="{ enabled: true, position: 'bottom', perPage: 20, dropdownAllowAll: false }"
                  :sort-options="{enabled: false, initialSortBy: { field: 'address_balance', type: 'desc' }}"
                  styleClass="vgt-table">

                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'address_balance'">
                      <div class="d-flex flex-row justify-content-end">
                        <p style="font-size:20px">{{formatToReadableNumberWithShor(props.row.address_balance).quanta}}</p>
                        <p style="font-size:12px" class="p-r-5">{{formatToReadableNumberWithShor(props.row.address_balance).shor}}</p>
                      </div>
                    </span>
                    <span v-else-if="props.column.field == 'wallet_address'" class="richlist-link" @click="onCellClick(props.row)">
                      <p class="text-break">{{smallerWalletAddress(props.row.wallet_address)}}
                        <v-icon name="link" scale="1" />
                      </p>
                    </span>
                    <span v-else-if="props.column.field == 'percentage_of_supply'">
                      <p class="d-flex justify-content-end" style="font-size:20px">
                        {{ props.row.percentage_of_supply }}%
                      </p>
                    </span>
                    <span v-else>
                      {{ props.formattedRow[props.column.field] }}
                    </span>
                  </template>
                </vue-good-table>
              </template>
          



          </div>
       

    </div>
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
        sliderPercentage: false,
        walletCategories: false,
        exchangeWallets: false,
      },
      showExchanges: false,
      walletCategoriesStats: [],
      exchangeWallets: [],
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
      exchangeColumns: [

      {
        label: 'Exchange',
        field: 'exchange_name',
      },
      {
        label: 'Wallet Address',
        field: 'wallet_address',
      },
      {
        label: 'Balance (Quanta)',
        field: 'address_balance',
        type: 'number',
      },
      {
        label: '% of Total Supply',
        field: 'percentage_of_supply',
        type: 'number',
      },
    ],
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
    formatToReadableNumberWithShor(address_balance) {
      const number = address_balance /// 1000000000
      const number_split = number.toFixed(9).split('.')
      const number_split_quanta = number_split[0].toString().replace(/\B(?=(\d{3})+(?!.))/g, ",")
      return {
        quanta: number_split_quanta,
        shor: number_split[1]
      }
    },

    formatToReadableNumberWithShordefined(address_balance) {
      const number = address_balance / 1000000000
      const number_split = number.toFixed(9).split('.')
      const number_split_quanta = number_split[0].toString().replace(/\B(?=(\d{3})+(?!.))/g, ",")
      return {
        quanta: number_split_quanta,
        shor: number_split[1]
      }
    },

    formatPercentage(number) {
      return number.toFixed(2) + ' %'

    },
    smallerWalletAddress(address) {
      const newAddress = address.substring(0, 20) + '..........' + address.slice(-20)
      return newAddress
    },




    onCellClick(params) {
      this.$router.push({
        name: 'wallet-data',
        params: {
          qrl_address: params.wallet_address
        }
      })
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
    this.isLoading.chart = true;
    this.isLoading.sliderPercentage = true;
    this.isLoading.walletCategories = true;
    this.isLoading.exchangeWallets = true;

      axios.get('api/wallet-distribution')
    .then(response => {
      this.chartOptions.series[0].data = response.data.distribution_percentile.address_balance_list;
      this.chartOptions.xAxis.categories = response.data.distribution_percentile.address_balance_group_list;
      this.distributionByPercentage.percentageOwned = response.data.distribution_percentage.percentage_owned;
      this.distributionByPercentage.volumnOwned = response.data.distribution_percentage.volume_owned;
      this.sliderOptionsWalletsHoldingX.data = response.data.distribution_wallets_holding_x;



      this.exchangeWallets = (response.data.exchange_addresses || []).map(wallet => ({
        exchange_name: wallet.wallet_custom_name || "Unknown Exchange",  // Ensure name is present
        wallet_address: String(wallet.wallet_address),  // Ensure it's a string
        address_balance: wallet.address_balance / 1e9,  // Convert atomic units to Quanta
        percentage_of_supply: ((wallet.address_balance / response.data.emission) * 100).toFixed(2) // Percentage of total supply
      }));

      this.walletCategoriesStats = response.data.wallet_categories_stats.map(category => ({
        name: category.name,
        count: category.count,
        totalValue: category.total_value / 1e9, // Convert from atomic units
        percentage: category.percentage
      }));
    })
    .catch(error => {
      console.error("Error fetching wallet data:", error);
      this.hasError.chart = true;
      this.hasError.sliderPercentage = true;
    })
    .finally(() => {
      this.isLoading.chart = false;
      this.isLoading.sliderPercentage = false;
      this.isLoading.walletCategories = false;
      this.isLoading.exchangeWallets = false; // ✅ Make sure it stops loading
    });

  }


}
</script>