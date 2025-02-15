<template>
  <div>
    <!-- begin page-header -->
    <h1 class="page-header">Site Statistics</h1>
    <p class="page-description">Overview of blockchain data</p>
    <!-- end page-header -->

    <!-- begin grid layout for statistics -->
    <div class="d-flex justify-content-center align-items-stretch flex-wrap col-xl-12 col-md-12 col-sm-12">
      <!-- Loading Spinner -->
      <template v-if="isLoading">
        <div class="d-flex justify-content-center align-items-center min-h-400 w-100">
          <loading-spinner-dot
            class="center"
            :animation-duration="1000"
            :dot-size="55"
            color="var(--qrl-tertaire)"
          />
        </div>
      </template>

      <template v-else>
        <!-- Block Statistics Column -->
        <div class="d-flex flex-column align-items-start stats-column">
          <h2 class="statistics-title">Block Statistics</h2>
          <div
            class="card shadow p-20 text-left mb-4"
            v-for="(stat, index) in blockStats"
            :key="index"
          >
            <h3>{{ stat.title }}</h3>
            <p class="stat-value">{{ stat.value }}</p>
          </div>
        </div>

        <!-- Transaction Statistics Column -->
        <div class="d-flex flex-column align-items-start stats-column">
          <h2 class="statistics-title">Transaction Statistics</h2>
          <div
            class="card shadow p-20 text-left mb-4"
            v-for="(stat, index) in transactionStats"
            :key="index"
          >
            <h3>{{ stat.title }}</h3>
            <p class="stat-value">{{ stat.value }}</p>
          </div>
        </div>
      </template>
    </div>
    <!-- end grid layout for statistics -->
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
        content: "Statistics of The Quantum Resistant Ledger (QRL) blockchain.",
      },
    ],
  },
  data() {
    return {
      isLoading: true,
      hasError: false,
      blockStats: [
        { title: "Highest Block Number", value: null },
        { title: "Total Rows in Database", value: null },
        { title: "Missing Blocks", value: null },
        { title: "Compliance Percentage", value: null },
      ],
      transactionStats: [
        { title: "Total Transactions in Blocks", value: null },
        { title: "Total Transactions in Database", value: null },
        { title: "Missing Transactions", value: null },
        { title: "Transaction Compliance Percentage", value: null },
      ],
    };
  },
  methods: {
    fetchStatistics() {
      axios
        .get("api/block-statistics")
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
          } = response.data;

          this.blockStats = [
            { title: "Highest Block Number", value: highest_block_number },
            { title: "Total Rows in Database", value: total_rows },
            { title: "Missing Blocks", value: missing_blocks },
            { title: "Compliance Percentage", value: `${compliance_percentage.toFixed(2)}%` },
          ];

          this.transactionStats = [
            { title: "Total Transactions in Blocks", value: total_transactions_in_blocks },
            { title: "Total Transactions in Database", value: total_transactions_in_database },
            { title: "Missing Transactions", value: missing_transactions },
            { title: "Transaction Compliance Percentage", value: `${compliance_percentage_transactions.toFixed(2)}%` },
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
  },
  created() {
    this.fetchStatistics();
  },
};
</script>

<style>
.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.align-items-start {
  align-items: flex-start;
}

.statistics-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--qrl-primary);
  margin-bottom: 1rem;
}

.card {
  background-color: var(--qrl-primary);
  border-radius: 12px;
  text-align: center;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 300px;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--qrl-white);
}

.mb-4 {
  margin-bottom: 1.5rem !important;
}

.min-h-400 {
  min-height: 400px;
}

/* Responsieve breedte-instellingen */
.stats-column {
  width: 50%;
}

/* Op kleinere schermen moet de breedte 100% zijn */
@media (max-width: 768px) {
  .stats-column {
    width: 100%;
  }
}
</style>
