<template>
<div>
  <!-- begin page-header -->
  <h1 class="page-header">QuantaScan.io - Donations</h1>
  <p class="page-description"> sdfdsfsd</p>
  <!-- end page-header -->
  <!-- begin row -->
  <div class="row">
    <!-- begin panel -->
    <div class="col-xl-12">
      <template v-if="isLoading.data">
        <div class="d-flex align-items-center min-h-200">
          <loading-spinner-dot class="center" :animation-duration="1000" :dot-size="55" color="var(--qrl-tertaire)" />
        </div>
      </template>
      <template v-else>
        <div>

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
export default {
  data() {
    return {
      isLoading: {
        data: false,
      },
      hasError: {
        data: false,
      },
    };
  },

  computed: {},



  methods: {},

  created() {
    this.isLoading.data = true
    axios.get('api/donation-data')
      .then(response => {
        const data = response.data
        const chartData = data.chart_data_point_list
        let i = 0
        let dataLength = chartData.length
        for (i; i < dataLength; i += 1) {
          this.chartOptions.series[0].data.push({
            "x": chartData[i].date,
            "y": chartData[i].block_size_mean,
            "block_size_min": chartData[i].block_size_min,
            "block_size_max": chartData[i].block_size_max,
          })
        }
        this.isLoading.data = false
      })
      .catch(error => {
        console.log(error)
        this.hasError.data = true
      })
      .finally(() => this.isLoading.data = false)


  },

}
</script>