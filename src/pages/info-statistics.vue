<template>
  <div>
    <!-- begin page-header -->
    <h1 class="page-header">Site Statistics</h1>
    <p class="page-description">Overview of blockchain data</p>
    <!-- end page-header -->

    <!-- begin column layout -->
    <div class="d-flex flex-column align-items-start p-20">
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
        <!-- Statistics Cards -->
        <div
          class="card shadow p-20 text-center mb-4 w-100"
          v-for="(stat, index) in stats"
          :key="index"
        >
          <h3>{{ stat.title }}</h3>
          <p class="stat-value">{{ stat.value }}</p>
        </div>
      </template>
    </div>
    <!-- end column layout -->
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
      stats: [
        { title: "Highest Block Number", value: null },
        { title: "Total Rows in Database", value: null },
        { title: "Missing Blocks", value: null },
        { title: "Compliance Percentage", value: null },
      ],
    };
  },
  methods: {
    fetchStatistics() {
      axios
        .get("api/block-statistics")
        .then((response) => {
          const { highest_block_number, total_rows, compliance_percentage, missing_blocks } =
            response.data;

          this.stats = [
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
              value: `${compliance_percentage.toFixed(4)}%`,
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
.page-header {
  font-size: 2rem;
  font-weight: bold;
  color: var(--qrl-tertaire);
}
.page-description {
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 2rem;
}
.d-flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}
.align-items-start {
  align-items: flex-start;
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
.w-100 {
  width: 100%;
}
.min-h-400 {
  min-height: 400px;
}
</style>
