<template>
<div>

  <!-- begin page-header -->
  <h1 class="page-header">Quantum Secure Wallet Insights</h1>
  <div class="d-flex flex-column justify-content-center">
    <div class="d-flex justify-content-center p-b-10" v-if="walletGeneralData.wallet_custom_name">
      <span class="badge badge-secondary" style="font-size:16px;">{{walletGeneralData.wallet_custom_name}}</span>
      <span class="badge badge-secondary" style="font-size:16px;">{{walletGeneralData.wallet_type}}</span>
    </div>
    <div class="d-flex flex-row text-break page-description copy-donation-address" @click="copyQRLAddress">{{this.$route.params.qrl_address}}
      <v-icon class="primary-color m-l-10 align-self-center" name="copy" scale="1" />
    </div>
  </div>
  <div class="d-flex align-items-center justify-content-center"
    v-if="isLoading.chart == false && (hasError.walletData != 404 || hasError.chart != 404) ">
    <div class="btn btn-secondary btn-sm" @click="goToPage">
      <p class="m-0">Go to Offical QRL Explorer</p>
    </div>
  </div>
  <!-- end page-header -->

  <template v-if="hasError.walletData == 404 && hasError.chart == 404">
    <div class="d-flex align-items-center justify-item-center min-h-100">
      <p class="p-t-40 d-flex flex-fill align-self-center justify-content-center" style="font-size:40px; color:var(--qrl-secundary)">Wallet Could Not
        Be Found</p>
    </div>
  </template>
  <template v-else>
    <!-- begin row -->
    <div class="row m-t-40">
      <!-- begin stats panel -->
      <div class="col-xl-3 col-md-3 col-sm-6 d-flex align-items-stretch">
        <div class="widget widget-stats bg-qrl-widget-primary d-flex flex-fill">
          <div class="stats-icon"></div>
          <div class="stats-info">
            <h2>Rank On The Rich list</h2>
            <template v-if="isLoading.walletData">
              <div class="d-flex align-items-center min-h-100">
                <loading-spinner-dot class="" :animation-duration="1000" :dot-size="20" color="var(--qrl-tertaire)" />
              </div>
            </template>
            <template v-else>
              <div class="d-flex flex-row">
                <p>{{walletGeneralData.rank}}</p>
                <p class="p-l-5" style="font-size:12px">th</p>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!-- end stats panel -->
      <!-- begin stats panel -->
      <div class="col-xl-3 col-md-3 col-sm-6 d-flex align-items-stretch">
        <div class="widget widget-stats bg-qrl-widget-primary d-flex flex-fill">
          <div class="stats-icon"></div>
          <div class="stats-info">
            <h2>Wallet Balance</h2>
            <template v-if="isLoading.walletData">
              <div class="d-flex align-items-center min-h-100">
                <loading-spinner-dot class="" :animation-duration="1000" :dot-size="20" color="var(--qrl-tertaire)" />
              </div>
            </template>
            <template v-else>
              <div class="d-flex flex-column">
                <div class="d-flex flex-wrap">
                  <p style="font-size:20px">{{formatToReadableNumberWithShor(walletGeneralData.address_balance).quanta}}</p>
                  <p style="font-size:12px" class="p-r-5">{{formatToReadableNumberWithShor(walletGeneralData.address_balance).shor}}</p>
                  <p style="font-size:20px"> Quanta</p>
                </div>
                <div class="d-flex flex-wrap">
                  <p style="font-size:16px">{{selectedCurrency.prefix}} {{currentWalletValue(walletGeneralData.address_balance).predot}}</p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!-- end stats panel -->
      <!-- begin stats panel -->
      <div class="col-xl-3 col-md-3 col-sm-6 d-flex align-items-stretch">
        <div class="widget widget-stats bg-qrl-widget-primary d-flex flex-fill">
          <div class="stats-icon"></div>
          <div class="stats-info">
            <h2>Quantum Secure Since</h2>
            <template v-if="isLoading.walletData">
              <div class="d-flex align-items-center min-h-100">
                <loading-spinner-dot class="" :animation-duration="1000" :dot-size="20" color="var(--qrl-tertaire)" />
              </div>
            </template>
            <template v-else>
              <div class="d-flex flex-row">
                <p>{{readableTime}}</p>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!-- end stats panel -->
      <!-- begin stats panel -->
      <div class="col-xl-3 col-md-3 col-sm-6 d-flex align-items-stretch">
        <div class="widget widget-stats bg-qrl-widget-primary d-flex flex-fill">
          <div class="stats-icon"></div>
          <div class="stats-info">
            <h2>Number of POS Keys</h2>
            <template v-if="isLoading.walletData">
              <div class="d-flex align-items-center min-h-100">
                <loading-spinner-dot class="" :animation-duration="1000" :dot-size="20" color="var(--qrl-tertaire)" />
              </div>
            </template>
            <template v-else>
              <div class="d-flex flex-row">
                <div class="d-flex flex-wrap">
                  <p style="font-size:20px">{{calculatePOS}}</p>
                </div>
              </div>
              <a class="" style="text-decoration: none;"
                href="https://www.theqrl.org/blog/project-zond-qrls-proof-of-stake-code-is-released-to-the-public/" target="_blank"
                rel="nofollow noopener">
                <span class="badge badge-secondary">POS in Development, Read More ></span>
              </a>
            </template>
          </div>
        </div>
      </div>
      <!-- end stats panel -->
    </div>
    <!-- end row -->
    <!-- begin row -->
    <div class="row m-b-40">
      <!-- begin panel -->
      <div class="note note-info">
        <div class="note-icon">
          <v-icon name="exclamation" scale="2" />
        </div>
        <div class="note-content">
          <p>In the graph below the total wallet balance can be off. This is caused by missing transactions in the database. The wallet balance above
            is
            correct</p>
        </div>
      </div>
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
    <!-- begin row -->
    <div class="row m-t-40">
      <!-- begin stats panel -->
      <template v-if=" !walletTransactionData.list_top_transactions_sending || !walletTransactionData.list_top_transactions_sending.length">
      </template>
      <template v-else>
        <div class="col-xl-6 col-md-12 col-sm-12 d-flex flex-column align-items-stretch p-b-30 ">
          <h2>Transactions Out - Ranked</h2>
          <vue-good-table ref='chart' :columns="topTransactionSendingListColumns" :rows="walletTransactionData.list_top_transactions_sending"
            :lineNumbers="true" :search-options="{ enabled: false, }"
            :pagination-options="{ enabled: true,  position: 'bottom', perPage: 5, dropdownAllowAll: false, perPageDropdown: [10], }"
            :sort-options="{enabled: false,}" styleClass="vgt-table condensed">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'transaction_amount_send'">
                <div class="d-flex flex-row">
                  <p style="font-size:20px">{{formatToReadableNumberWithShor(props.row.transaction_amount_send).quanta}}</p>
                  <p style="font-size:12px" class="p-r-5">{{formatToReadableNumberWithShor(props.row.transaction_amount_send).shor}}</p>
                </div>
              </span>
              <span v-else-if="props.column.field == 'transaction_receiving_wallet_address'" class="richlist-link"
                @click="onAddressClick(props.row.transaction_receiving_wallet_address)">
                <p class="text-break">
                  {{smallerWalletAddress(props.row.transaction_receiving_wallet_address)}}
                  <v-icon name="search" scale="1" v-if="props.row.transaction_type != 'slave'" />
                </p>
              </span>
              <span v-else-if="props.column.field == 'transaction_hash'" class="richlist-link"
                @click="onTransactionClick(props.row.transaction_hash)">
                <p class="text-break">{{smallerWalletAddress(props.row.transaction_hash)}}
                  <span class="badge badge-secondary m-l-5 m-r-5">{{props.row.transaction_type}}</span>
                  <v-icon name="external-link-alt" scale="1" />
                </p>
              </span>
              <span v-else>
                {{props.formattedRow[props.column.field]}}
              </span>
            </template>
          </vue-good-table>
        </div>
      </template>
      <!-- end stats panel -->
      <!-- begin stats panel -->
      <template v-if=" !walletTransactionData.list_top_transactions_receiving || !walletTransactionData.list_top_transactions_receiving.length">
      </template>
      <template v-else>
        <div class="col-xl-6 col-md-12 col-sm-12 d-flex flex-column align-items-stretch p-b-30">
          <h2>Transactions In - Ranked</h2>
          <vue-good-table ref='chart' :columns="topTransactionReceivingListColumns" :rows="walletTransactionData.list_top_transactions_receiving"
            :lineNumbers="true" :search-options="{ enabled: false, }"
            :pagination-options="{ enabled: true,  position: 'bottom', perPage: 5, dropdownAllowAll: false, perPageDropdown: [10], }"
            :sort-options="{enabled: false,}" styleClass="vgt-table condensed">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'transaction_amount_send'">
                <div class="d-flex flex-row">
                  <p style="font-size:20px">{{formatToReadableNumberWithShor(props.row.transaction_amount_send).quanta}}</p>
                  <p style="font-size:12px" class="p-r-5">{{formatToReadableNumberWithShor(props.row.transaction_amount_send).shor}}</p>
                </div>
              </span>
              <span v-else-if="props.column.field == 'transaction_sending_wallet_address'" class="richlist-link"
                @click="onAddressClick(props.row.transaction_sending_wallet_address)">
                <p class="text-break">{{smallerWalletAddress(props.row.transaction_sending_wallet_address)}}
                  <v-icon name="search" scale="1" v-if="props.row.transaction_type != 'slave'" />
                </p>
              </span>
              <span v-else-if="props.column.field == 'transaction_hash'" class="richlist-link"
                @click="onTransactionClick(props.row.transaction_hash)">
                <p class="text-break">{{smallerWalletAddress(props.row.transaction_hash)}}
                  <span class="badge badge-secondary m-l-5 m-r-5">{{props.row.transaction_type}}</span>
                  <v-icon name="external-link-alt" scale="1" />
                </p>
              </span>
              <span v-else>
                {{props.formattedRow[props.column.field]}}
              </span>
            </template>
          </vue-good-table>
        </div>
      </template>
      <!-- end stats panel -->
      <!-- begin stats panel -->
      <template v-if=" !walletTransactionData.list_most_sending_wallets || !walletTransactionData.list_most_sending_wallets.length">
      </template>
      <template v-else>
        <div class="col-xl-6 col-md-12 col-sm-12 d-flex flex-column align-items-stretch p-b-30 ">
          <h2>Sending Wallets - Ranked</h2>
          <vue-good-table ref='chart' :columns="topWalletsSendingListColumns" :rows="walletTransactionData.list_most_sending_wallets"
            :lineNumbers="true" :search-options="{ enabled: false, }"
            :pagination-options="{ enabled: true,  position: 'bottom', perPage: 5, dropdownAllowAll: false, perPageDropdown: [10], }"
            :sort-options="{enabled: false,}" styleClass="vgt-table condensed">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'transaction_amount_send'">
                <div class="d-flex flex-row">
                  <p style="font-size:20px">{{formatToReadableNumberWithShor(props.row.transaction_amount_send).quanta}}</p>
                  <p style="font-size:12px" class="p-r-5">{{formatToReadableNumberWithShor(props.row.transaction_amount_send).shor}}</p>
                </div>
              </span>
              <span v-else-if="props.column.field == 'transaction_sending_wallet_address'" class="richlist-link"
                @click="onAddressClick(props.row.transaction_sending_wallet_address)">
                <p class="text-break">
                  {{smallerWalletAddress(props.row.transaction_sending_wallet_address)}}
                  <v-icon name="search" scale="1" v-if="props.row.transaction_type != 'slave'" />
                </p>
              </span>
              <span v-else>
                {{props.formattedRow[props.column.field]}}
              </span>
            </template>
          </vue-good-table>
        </div>
      </template>
      <!-- end stats panel -->
      <!-- begin stats panel -->
      <template v-if=" !walletTransactionData.list_most_receiving_wallets || !walletTransactionData.list_most_receiving_wallets.length">
      </template>
      <template v-else>
        <div class="col-xl-6 col-md-12 col-sm-12 d-flex flex-column align-items-stretch p-b-30">
          <h2>Receiving Wallets - Ranked</h2>
          <vue-good-table ref='chart' :columns="topWalletsReceivingListColumns" :rows="walletTransactionData.list_most_receiving_wallets"
            :lineNumbers="true" :search-options="{ enabled: false, }"
            :pagination-options="{ enabled: true,  position: 'bottom', perPage: 5, dropdownAllowAll: false, perPageDropdown: [10], }"
            :sort-options="{enabled: false,}" styleClass="vgt-table condensed">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'transaction_amount_send'">
                <div class="d-flex flex-row">
                  <p style="font-size:20px">{{formatToReadableNumberWithShor(props.row.transaction_amount_send).quanta}}</p>
                  <p style="font-size:12px" class="p-r-5">{{formatToReadableNumberWithShor(props.row.transaction_amount_send).shor}}</p>
                </div>
              </span>
              <span v-else-if="props.column.field == 'transaction_receiving_wallet_address'" class="richlist-link"
                @click="onAddressClick(props.row.transaction_receiving_wallet_address)">
                <p class="text-break">{{smallerWalletAddress(props.row.transaction_receiving_wallet_address)}}
                  <v-icon name="search" scale="1" v-if="props.row.transaction_type != 'slave'" />
                </p>
              </span>
              <span v-else>
                {{props.formattedRow[props.column.field]}}
              </span>
            </template>
          </vue-good-table>
        </div>
      </template>
      <!-- end stats panel -->
    </div>
    <!-- end row -->




    <!-- begin row -->
    <div class="row m-t-40">
      <!-- begin stats panel -->
      <div class="col-xl-3 col-md-3 col-sm-6 d-flex align-items-stretch">
        <div class="widget widget-stats bg-qrl-widget-primary d-flex flex-fill">
          <div class="stats-icon"></div>
          <div class="stats-info">
            <h2>Number of Transactions Send</h2>
            <template v-if="isLoading.walletData">
              <div class="d-flex align-items-center min-h-100">
                <loading-spinner-dot class="" :animation-duration="1000" :dot-size="20" color="var(--qrl-tertaire)" />
              </div>
            </template>
            <template v-else>
              <div class="d-flex flex-row">
                <div class="d-flex flex-row">
                  <p>{{walletTransactionData.total_transaction_send_number}}</p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!-- end stats panel -->
      <!-- begin stats panel -->
      <div class="col-xl-3 col-md-3 col-sm-6 d-flex align-items-stretch">
        <div class="widget widget-stats bg-qrl-widget-primary d-flex flex-fill">
          <div class="stats-icon"></div>
          <div class="stats-info">
            <h2>Number of Transactions Received</h2>
            <template v-if="isLoading.walletData">
              <div class="d-flex align-items-center min-h-100">
                <loading-spinner-dot class="" :animation-duration="1000" :dot-size="20" color="var(--qrl-tertaire)" />
              </div>
            </template>
            <template v-else>
              <div class="d-flex flex-row">
                <div class="d-flex flex-row">
                  <p>{{walletTransactionData.total_transaction_receive_number}}</p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!-- end stats panel -->
    </div>
    <!-- end row -->
</template>

</div>
</template>


<script>
//import PageOptions from '../config/PageOptions.vue'
import axios from 'axios'
import Highcharts from "highcharts";

export default {
  name: 'walletData',
  metaInfo: {
    titleTemplate: '%s | Insights in QRL wallets ',
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Detailed insights in wallets of The Quantum Resistant Ledger(QRL) blockchain."
        },
      ],
    link: [
      {
        rel: 'canonical',
        href: 'https://www.quantascan.io/wallet-data'
      }
]
  },

  data() {
    return {
      isLoading: {
        walletData: false,
        chart: false,
        coingeckoPriceData: false,
      },
      hasError: {
        walletData: false,
        chart: false,
        coingeckoPriceData: false,
      },
      updateArgs: [true, true, true],
      walletGeneralData: {},
      walletTransactionData: {},
      selectedCurrency: {
        name: 'usd',
        prefix: "$"
      },
      coingeckoPriceData: {},

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
            text: 'Amount of Quanta'
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

            const total_amount_quanta_split = this.y.toFixed(9).split('.')
            const total_amount_quanta_split_quanta = total_amount_quanta_split[0].toString().replace(/\B(?=(\d{3})+(?!.))/g, ",")

            const total_amount_quanta_added_split = this.point.transaction_amount_send_sum.toFixed(9).split('.')
            const total_amount_quanta_added_split_quanta = total_amount_quanta_added_split[0].toString().replace(/\B(?=(\d{3})+(?!.))/g, ",")


            const tooltipText =
              Highcharts.dateFormat('%e %B %Y', date) + '<br/>' +
              '<b>Quanta</b>' + '<br/>' +
              'Total: ' + total_amount_quanta_split_quanta + '<br/>' +
              'Daily Change: ' + total_amount_quanta_added_split_quanta
            return tooltipText



          },

        },
        series: [
          {
            type: 'spline',
            name: 'Transactions',
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
      },
      topTransactionReceivingListColumns: [
        {
          label: 'Sending Wallet',
          field: 'transaction_sending_wallet_address',
        },
        {
          label: 'Transaction',
          field: 'transaction_hash',
        },
        {
          label: 'Amount',
          field: 'transaction_amount_send',
          type: 'number',
        },
        {
          label: 'transaction Type',
          field: 'transaction_type',
          hidden: true,
        }

      ],

      topTransactionSendingListColumns: [
        {
          label: 'Receiving Wallet',
          field: 'transaction_receiving_wallet_address',
        },
        {
          label: 'Transaction',
          field: 'transaction_hash',
        },
        {
          label: 'Amount',
          field: 'transaction_amount_send',
          type: 'number',
        },
        {
          label: 'transaction Type',
          field: 'transaction_type',
          hidden: true,
        }

      ],


      topWalletsSendingListColumns: [
        {
          label: 'Sending Wallet',
          field: 'transaction_sending_wallet_address',
        },
        {
          label: 'Number of Transactions',
          field: 'number_of_transactions',
        },
        {
          label: 'Total Amount',
          field: 'transaction_amount_send',
          type: 'number',
        },


      ],

      topWalletsReceivingListColumns: [
        {
          label: 'Receiving Wallet',
          field: 'transaction_receiving_wallet_address',
        },
        {
          label: 'Number of Transactions',
          field: 'number_of_transactions',
        },
        {
          label: 'Total Amount',
          field: 'transaction_amount_send',
          type: 'number',
        },


      ],


    }
  },

  computed: {
    calculatePOS() {
      const quanta = this.walletGeneralData.address_balance / 1000000000
      const quantaFixed = quanta.toFixed(0)
      const numbOfPOSMax = Math.min(Math.max(parseInt(Math.floor(quantaFixed / 10000)), 0), 100);
      return numbOfPOSMax
    },

    readableTime() {
      const date = this.walletGeneralData.address_first_found
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
      return new Date(date).toLocaleDateString(undefined, options)

    }

  },

  methods: {
    apiCall1(qrl_address) {
      this.isLoading.walletData = true
      this.hasError.walletData = false
      axios.get('api/wallet-data', {
          params: {
            wallet: qrl_address
          }
        })
        .then(response => {
          const dataGeneral = response.data
          this.walletGeneralData = dataGeneral.general_wallet_data
        })
        .catch(error => {
          if (error.response.status == 404) {
            this.hasError.walletData = error.response.status
          } else {
            console.log(error)
          }
        })
        .finally(() => {
          this.isLoading.walletData = false
        })
    },

    apiCall2(qrl_address) {
      this.isLoading.chart = true
      this.hasError.chart = false

      axios.get('api/wallet-data-2', {
          params: {
            wallet: qrl_address
          }
        })
        .then(response => {
          const dataTransaction = response.data
          const chartData = dataTransaction.chart_data_point_list
          let i = 0
          let dataLength = chartData.length
          for (i; i < dataLength; i += 1) {
            this.chartOptions.series[0].data.push({
              "x": chartData[i].date, //date
              "y": chartData[i].wallet_value_total_daily / 1000000000, //total_wallet_found,
              "transaction_amount_send_sum": chartData[i].transaction_amount_send_sum / 1000000000,
            })
          }
          this.walletTransactionData = dataTransaction.general_wallet_transaction_data
        })
        .catch(error => {
          if (error.response.status == 404) {
            this.hasError.chart = error.response.status
          } else {
            console.log(error)
          }
        })
        .finally(() => {
          this.isLoading.chart = false
        })
    },

    goToPage() {
      window.open('https://explorer.theqrl.org/a/' + this.$route.params.qrl_address)
    },

    formatToReadableNumberWithShor(numb) {
      const number = numb / 1000000000
      const number_split = number.toFixed(9).split('.')
      const number_split_quanta = number_split[0].toString().replace(/\B(?=(\d{3})+(?!.))/g, ",")
      return {
        quanta: number_split_quanta,
        shor: number_split[1]
      }
    },

    smallerWalletAddress(address) {
      const newAddress = address.substring(0, 10) + '.....' + address.slice(-10)
      return newAddress
    },

    onAddressClick(params) {
      if (params.length == 79 && params.startsWith('Q')) {
        this.$router.push({
            name: 'wallet-data',
            params: {
              qrl_address: params
            }
          })
          .catch(() => {})

      } else {
        this.$swal({
          position: 'top-end',
          icon: 'error',
          title: 'Slave Wallets',
          text: 'Slave Wallets Are Not supported yet',
          showConfirmButton: false,
          timer: 2000
        })
      }

    },

    onTransactionClick(params) {
      window.open('https://explorer.theqrl.org/tx/' + params)

    },

    copyQRLAddress() {
      this.$clipboard(this.$route.params.qrl_address)
      this.$swal({
        position: 'top-end',
        icon: 'success',
        title: 'QRL Address Copied',
        showConfirmButton: false,
        timer: 2000
      })
    },
    currentWalletValue(number) {
      const vol = number / 1000000000 // get number of quanta
      const currencyValue = this.coingeckoPriceData[this.selectedCurrency.name]

      const walletValue = vol * currencyValue
      console.log(walletValue)

      const number_split = walletValue.toFixed(2).split('.')
      const number_split_predot = number_split[0].toString().replace(/\B(?=(\d{3})+(?!.))/g, ",")
      return {
        predot: number_split_predot,
        afterdot: number_split[1]
      }

    }


  },

  beforeRouteUpdate(to, from, next) {
    this.chartOptions.series[0].data = []
    this.walletTransactionData = {}
    this.apiCall1(to.params.qrl_address);
    this.apiCall2(to.params.qrl_address);
    next();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  },

  created() {
    this.isLoading.coingeckoPriceData = true
    this.apiCall1(this.$route.params.qrl_address)
    this.apiCall2(this.$route.params.qrl_address)
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=quantum-resistant-ledger&vs_currencies=usd%2Ceur%2C')
      .then(response => {
        this.coingeckoPriceData = response.data["quantum-resistant-ledger"]
        console.log(this.coingeckoPriceData)
        this.isLoading.coingeckoPriceData = false
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.isLoading.coingeckoPriceData = false)
  },




}
</script>
