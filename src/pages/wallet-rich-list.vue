<template>
<div>
  <!-- begin page-header -->
  <h1 class="page-header">The Quantum Ledger Rich List</h1>
  <p class="page-description">Top 500 Quanta Holding Wallets</p>
  <!-- end page-header -->

  <!-- begin row -->
  <div class="row">
    <!-- begin col-12 -->

    <div class="col-xl-12">
      <template v-if="isLoading.richListData">
        <div class="d-flex align-items-center min-h-400">
          <loading-spinner-dot class="center" :animation-duration="1000" :dot-size="55" color="var(--qrl-tertaire)" />
        </div>
      </template>
      <template v-else>
        <div class="col-xl-12 d-flex flex-row align-items-center justify-content-end">
          <p class="p-r-10 m-b-0 d-flex align-items-center">Export</p>
          <button type="button" class="btn btn-primary" @click="exportData()">CSV</button>
        </div>
        <vue-good-table ref='richList' :columns="richListColumns" :rows="richListData" :lineNumbers="false" :search-options="{ enabled: false, }"
          :pagination-options="{ enabled: true,  position: 'bottom', perPage: 20, dropdownAllowAll: false, }"
          :sort-options="{enabled: false, initialSortBy: {field: 'address_balance', type: 'desc'}}" styleClass="vgt-table">
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'address_balance'">
              <div class="d-flex flex-row justify-content-end">
                <p style="font-size:20px">{{formatToReadableNumberWithShor(props.row.address_balance).quanta}}</p>
                <p style="font-size:12px" class="p-r-5">{{formatToReadableNumberWithShor(props.row.address_balance).shor}}</p>
              </div>
            </span>
            <span v-else-if="props.column.field == 'wallet_address'" class="richlist-link" @click="onCellClick(props.row)">
              <span class="badge badge-secondary p-r-15 p-l-15" style="font-size:14px">{{props.row.wallet_custom_name}}</span>
              <span class="badge badge-secondary p-r-15 p-l-15" style="font-size:14px">{{props.row.wallet_type}}</span>
              <p class="text-break">{{smallerWalletAddress(props.row.wallet_address)}}
                <v-icon name="link" scale="1" />
              </p>
            </span>
            <span v-else-if="props.column.field == 'address_balance_currency'">
              <p class="d-flex justify-content-end" style="font-size:20px">
                {{selectedCurrency.prefix}}{{currentWalletValue(props.row.address_balance).predot}}
              </p>

            </span>
            <span v-else>
              {{props.formattedRow[props.column.field]}}
            </span>
          </template>
        </vue-good-table>
      </template>
    </div>
    <!-- end col-12 -->
  </div>
  <!-- end row -->

</div>
</template>

<script>
import axios from 'axios'

export default {

  name: 'richList',
  metaInfo: {
    titleTemplate: '%s | The Quantum Resistant Ledger(QRL) richlist',
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Top 500 holding Quanta wallets of The Quantum Resistant Ledger(QRL) blockchain. Updated every 10 minutes"
        },
      ],
  },

  data() {
    return {
      isLoading: {
        richListData: false,
        coingeckoPriceData: false,
      },
      errored: false,

      selectedCurrency: {
        name: 'usd',
        prefix: "$"
      },
      coingeckoPriceData: {},

      richListData: [],
      richListColumns: [
        {
          label: '#',
          field: 'rank',
        },
        {
          label: 'Wallet',
          field: 'wallet_address',
          //  tdClass: 'text-break', //break-word
        },
        {
          label: 'Tag Name',
          field: 'wallet_custom_name',
          hidden: true,

        },
        {
          label: 'Wallet Type',
          field: 'wallet_type',
          hidden: true,

        },
        {
          label: 'Balance (Quanta)',
          field: 'address_balance',
          type: 'number',
        },

        {
          label: 'Balance (Currency)',
          field: 'address_balance_currency',
          type: 'number',
        },

        {
          label: '% Of Total',
          field: 'holding_in_percentage',
          type: 'number',
          formatFn: this.formatPercentage
        },
        {
          label: 'Quantum Secure Since',
          field: 'address_first_found',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd\'T\'HH:mm:ss',
          dateOutputFormat: 'dd MMM yyyy',

        },


      ],

    };
  },



  computed: {



  },



  methods: {

    formatToReadableNumberWithShor(address_balance) {
      const number = address_balance / 1000000000
      const number_split = number.toFixed(9).split('.')
      const number_split_quanta = number_split[0].toString().replace(/\B(?=(\d{3})+(?!.))/g, ",")
      return {
        quanta: number_split_quanta,
        shor: number_split[1]
      }

    },
    smallerWalletAddress(address) {
      const newAddress = address.substring(0, 20) + '..........' + address.slice(-20)
      return newAddress
    },


    formatPercentage(number) {
      return number.toFixed(2) + '%'
    },

    onCellClick(params) {
      this.$router.push({
        name: 'wallet-data',
        params: {
          qrl_address: params.wallet_address
        }
      })
    },

    currentWalletValue(number) {
      const vol = number / 1000000000 // get number of quanta
      const currencyValue = this.coingeckoPriceData[this.selectedCurrency.name]

      const walletValue = vol * currencyValue

      const number_split = walletValue.toFixed(2).split('.')
      const number_split_predot = number_split[0].toString().replace(/\B(?=(\d{3})+(?!.))/g, ",")
      return {
        predot: number_split_predot,
        afterdot: number_split[1]
      }

    },

    exportData() {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += [
        Object.keys(this.$refs.richList.filteredRows[0].children[0]).join(";"),
        ...this.$refs.richList.filteredRows[0].children.map(item => Object.values(item).join(";"))
      ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", "qrl-rich-list-top-500.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);


    },


  },

  created() {
    this.isLoading.richListData = true
    this.isLoading.coingeckoPriceData = true

    axios.get('api/wallet-rich-list')
      .then(response => {
        this.richListData = response.data.wallet_list
        this.isLoading.richListData = false
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.isLoading.richListData = false)

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