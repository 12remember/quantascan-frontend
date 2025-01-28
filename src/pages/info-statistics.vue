<template>
  <div>
    <!-- begin page-header -->
    <h1 class="page-header">Site Statistics</h1>
    <p class="page-description">Overview of blockchain data</p>
    <!-- end page-header -->

    <!-- begin grid layout for statistics -->
    <div class="d-flex flex-row justify-content-between p-20">
      <!-- Block Statistics Column -->
      <div class="d-flex flex-column align-items-start w-50">
        <h2 class="statistics-title">Block Statistics</h2>
        <template v-if="isLoading">
          <!-- Loading Spinner -->
          <div class="d-flex justify-content-center align-items-center min-h-400">
            <loading-spinner-dot
              class="center"
              :animation-duration="1000"
              :dot-size="55"
              color="var(--qrl-tertaire)"
            />
          </div>
        </template>
        <template v-else>
          <div
            class="card shadow p-20 text-center mb-4 w-100"
            v-for="(stat, index) in blockStats"
            :key="index"
          >
            <h3>{{ stat.title }}</h3>
            <p class="stat-value">{{ stat.value }}</p>
          </div>
        </template>
      </div>

      <!-- Transaction Statistics Column -->
      <div class="d-flex flex-column align-items-start w-50">
        <h2 class="statistics-title">Transaction Statistics</h2>
        <template v-if="isLoading">
          <!-- Loading Spinner -->
          <div class="d-flex justify-content-center align-items-center min-h-400">
            <loading-spinner-dot
              class="center"
              :animation-duration="1000"
              :dot-size="55"
              color="var(--qrl-tertaire)"
            />
          </div>
        </template>
        <template v-else>
          <div
            class="card shadow p-20 text-center mb-4 w-100"
            v-for="(stat, index) in transactionStats"
            :key="index"
          >
            <h3>{{ stat.title }}</h3>
            <p class="stat-value">{{ stat.value }}</p>
          </div>
        </template>
      </div>
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
          {
            title: "Highest Block Number",
            value: highest_block_number,
          },
          {
            title: "Total Rows in Database",
            value: total_rows,
          },
          {
            title: "Missing Blocks",
            value: missing_blocks,
          },
          {
            title: "Compliance Percentage",
            value: `${compliance_percentage.toFixed(2)}%`,
          },
        ];

        this.transactionStats = [
          {
            title: "Total Transactions in Blocks",
            value: total_transactions_in_blocks,
          },
          {
            title: "Total Transactions in Database",
            value: total_transactions_in_database,
          },
          {
            title: "Missing Transactions",
            value: missing_transactions,
          },
          {
            title: "Transaction Compliance Percentage",
            value: `${compliance_percentage_transactions.toFixed(2)}%`,
          },
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

.flex-row {
  flex-direction: row;
}

.flex-column {
  flex-direction: column;
}

.align-items-start {
  align-items: flex-start;
}

.justify-content-between {
  justify-content: space-between;
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
  margin-bottom: 1.5rem !important; /* Adds spacing between cards */
}

.w-50 {
  width: 50%;
}

.min-h-400 {
  min-height: 400px;
}

</style>
