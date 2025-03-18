<template>
  <div>
    <!-- begin page-header -->
    <h1 class="page-header">Site Statistics</h1>
    <p class="page-description">Overview of blockchain data</p>
    <!-- end page-header -->

    <!-- begin row for statistics cards -->
    <div class="row">
      <!-- Block Statistics Column -->
      <div class="col-xl-4 col-md-6 col-sm-12">
        <h2 class="statistics-title">Block Statistics</h2>
        <template v-if="isLoading">
          <div class="d-flex align-items-center min-h-400">
            <loading-spinner-dot
              class="center"
              :animation-duration="1000"
              :dot-size="55"
              color="var(--qrl-tertaire)"
            />
          </div>
        </template>
        <template v-else>
          <div class="card shadow p-20 text-left mb-4" v-for="(stat, index) in blockStats" :key="'block-'+index">
            <h3>{{ stat.title }}</h3>
            <p class="stat-value" v-html="stat.value"></p>
          </div>
        </template>
      </div>

      <!-- Transaction Statistics Column -->
      <div class="col-xl-4 col-md-6 col-sm-12">
        <h2 class="statistics-title">Transaction Statistics</h2>
        <template v-if="isLoading">
          <div class="d-flex align-items-center min-h-400">
            <loading-spinner-dot
              class="center"
              :animation-duration="1000"
              :dot-size="55"
              color="var(--qrl-tertaire)"
            />
          </div>
        </template>
        <template v-else>
          <div class="card shadow p-20 text-left mb-4" v-for="(stat, index) in transactionStats" :key="'tx-'+index">
            <h3>{{ stat.title }}</h3>
            <p class="stat-value">{{ stat.value }}</p>
          </div>
        </template>
      </div>

      <!-- Wallet Statistics Column -->
      <div class="col-xl-4 col-md-6 col-sm-12">
        <h2 class="statistics-title">Wallet Statistics</h2>
        <template v-if="isLoading">
          <div class="d-flex align-items-center min-h-400">
            <loading-spinner-dot
              class="center"
              :animation-duration="1000"
              :dot-size="55"
              color="var(--qrl-tertaire)"
            />
          </div>
        </template>
        <template v-else>
          <div class="card shadow p-20 text-left mb-4" v-for="(stat, index) in walletStats" :key="'wallet-'+index">
            <h3>{{ stat.title }}</h3>
            <p class="stat-value" v-html="stat.value"></p>
          </div>
        </template>
      </div>
    </div>
    <!-- end row -->
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "siteStatistics",
  metaInfo: {
    title: "Blockchain Statistics | Quantascan",
    meta: [
      {
        vmid: "description",
        name: "description",
        content:
          "Statistics of The Quantum Resistant Ledger (QRL) blockchain.",
      },
    ],
  },
  data() {
    return {
      isLoading: true,
      hasError: false,
      // Block statistics data – adjust value formatting as needed
      blockStats: [
        { title: "Highest Block Number", value: null },
        { title: "Total Rows in Database", value: null },
        { title: "Missing Blocks", value: null },
        { title: "Compliance Percentage", value: null },
      ],
      // Transaction statistics data
      transactionStats: [
        { title: "Total Transactions in Blocks", value: null },
        { title: "Total Transactions in Database", value: null },
        { title: "Missing Transactions", value: null },
        { title: "Transaction Compliance Percentage", value: null },
      ],
      // Wallet statistics – this new section includes total quanta and emission info.
      walletStats: [
        { title: "Total Quanta in Wallets", value: null },
        { title: "Emission", value: null },
        { title: "Percentage Held", value: null },
      ],
    };
  },
  methods: {
  fetchStatistics() {
    axios.get("api/block-statistics")
      .then((response) => {
        const {
          highest_block_number,
          total_rows,
          compliance_percentage,
          missing_blocks,
          total_transactions_in_blocks,
          total_transactions_in_database,
          missing_transactions,
          compliance_percentage_transactions,
          total_quanta_in_wallets,
          emission,
          missing_quanta
        } = response.data;

        this.blockStats = [
          { title: "Highest Block Number", value: highest_block_number },
          { title: "Total Rows in Database", value: total_rows },
          { title: "Missing Blocks", value: missing_blocks },
          { title: "Compliance Percentage", value: `${compliance_percentage}%` },
        ];

        this.transactionStats = [
          { title: "Total Transactions in Blocks", value: total_transactions_in_blocks },
          { title: "Total Transactions in Database", value: total_transactions_in_database },
          { title: "Missing Transactions", value: missing_transactions },
          { title: "Transaction Compliance Percentage", value: `${compliance_percentage_transactions}%` },
        ];

        // Convert atomic units to coins (divide by 1e8)
        const conversionFactor = 1e9;
        const totalQuantaCoins = total_quanta_in_wallets / conversionFactor;

        // Correctly format emission and percentage held
        const percentageHeld = emission > 0 ? ((totalQuantaCoins / (emission / conversionFactor)) * 100).toFixed(2) : "0.00";

        // Apply correct number formatting (split integer & decimal)
        this.walletStats = [
          { title: "Total Quanta in Wallets", value: this.formatNumberWithStyle(totalQuantaCoins) + " Quanta" },
          { title: "Coin Emission", value: this.formatNumberWithStyle(emission/conversionFactor) + " Quanta" },
          { title: "Missing Quanta in Wallets", value: this.formatNumberWithStyle(missing_quanta/conversionFactor) + " Quanta"  },
          { title: "Wallet Compliance Percentage", value: percentageHeld + "%" },
        ];
      })
      .catch((error) => {
        console.error("Error fetching statistics:", error);
        this.hasError = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
  },

  formatNumberWithStyle(number) {
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 9,
      maximumFractionDigits: 9
    }).format(number);

    const [intPart, decPart] = formatted.split('.'); // Split integer and decimal part
    return `<span>${intPart}</span><span class="number-dec">${decPart}</span>`;
  }
},
  created() {
    this.fetchStatistics();
  },
};
</script>

<style>
/* Basic layout and typography */

.statistics-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--qrl-primary);
  margin-bottom: 1rem;
}

/* Card styling similar to distribution page */
.card {
  background-color: var(--qrl-primary);
  border-radius: 12px;
  text-align: center;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  min-height: 150px;
}

/* Statistic value styling */
.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--qrl-white);
}

/* Responsive layout for columns */
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}
.col-xl-4,
.col-md-6,
.col-sm-12 {
  padding: 0 15px;
  margin-bottom: 30px;
  flex: 0 0 33.33%;
  max-width: 33.33%;
}
@media (max-width: 768px) {
  .col-xl-4,
  .col-md-6,
  .col-sm-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

/* Utility classes */
.d-flex {
  display: flex;
}
.align-items-center {
  align-items: center;
}
.min-h-400 {
  min-height: 400px;
}

.number-dec {
  font-size: 12px;
  vertical-align: super;
  opacity: 0.8;
}
</style>
