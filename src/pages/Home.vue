<template>
<div>
  <!-- begin page-header -->
  <div class="d-flex col-xl-8 col-md-8 col-sm-12 " style="height:90vh">
    <div class="d-flex flex-column align-self-center">
      <h1 class="page-header d-flex  align-items-center ">An analytics website for the Quantum Resistant Ledger(QRL) blockchain
      </h1>
      <div class="d-flex flex-column align-self-start p-b-20 p-t-40">
        <h2 class="d-flex page-description">A growing quantum secure blockchain ecosystem</h2>
        <div class="d-flex link-get-insights align-self-end">
          <p class="text-uppercase" @click="scrollMeTo('insights')">Get insights
          </p>
          <v-icon class="p-b-2" name="long-arrow-alt-right" scale="1" style="height:24;" />
        </div>
      </div>
    </div>
  </div>
  <!-- end page-header -->

  <!-- begin row -->
  <div class="row p-b-40" ref="insights">
    <h2 class="d-flex justify-content-center col-xl-12 m-10 p-b-40">Insights in the Quantum Resistant Ledger(QRL) blockchain</h2>
    <div class="d-flex justify-content-center align-items-stretch col-xl-6 col-md-6 col-sm-12" v-for="(item, index) in routers" :key="index">
      <!-- begin stats panel -->
      <div class="col-xl-8 col-md-10 col-sm-9 d-flex align-items-stretch">
        <router-link :to="{ name: item.urlname, params: {} }" style="text-decoration:none;" class="d-flex align-items-stretch flex-fill">
          <div class="widget widget-stats bg-qrl-widget-link-secundary d-flex flex-column align-items-stretch flex-fill">
            <div class="d-flex flex-fill align-item-stretch justify-content-center stats-info" style="">
              <h2 class="">{{item.title}}</h2>
            </div>
            <div class="d-flex flex-fill p-t-20">
              <p>{{item.description}}</p>
            </div>
          </div>
        </router-link>
      </div>
      <!-- end stats panel -->
    </div>
  </div>
  <!-- end row -->
</div>
</template>

<script>
export default {
  name: 'home',
  metaInfo: {
    titleTemplate: '%s | Insights in the QRL blockchain',
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Quantascan gives insights in The Quantum Resistant Ledger(QRL) blockchain. Containing a richlist, charts for average blocksize and blocktime, number stakers and more."
      },
    ],
  },

  data() {
    return {
      isLoading: {},
      routers: [
        {
          title: 'QRL Rich List',
          urlname: 'wallet-rich-list',
          description: 'A list with the top 500 Quanta holding wallets'
        },
        {
          title: 'Quanta Distribution',
          urlname: 'wallet-distribution',
          description: 'Shows the distribution of Quanta'
        },
        {
          title: 'Number of Wallets',
          urlname: 'wallet-number-of-wallets',
          description: 'Total number of wallets and daily new wallets'
        },
        {
          title: 'Transaction Fee',
          urlname: 'network-transaction-fee',
          description: 'Daily average fee paid for transactions on the network'
        },
        {
          title: 'Transaction Count/Volume',
          urlname: 'network-transactions',
          description: 'Daily total transactions and volume on the QRL blockchain'
        },
        {
          title: 'Circulating Quanta',
          urlname: 'network-total-circulating-quanta',
          description: 'Total Quanta on the QRL Network'
        },
        {
          title: 'Block Reward Decay',
          urlname: 'block-reward-decay',
          description: 'Mining block reward decay over 200 years'
        },
        {
          title: 'Number of Stakers',
          urlname: 'block-reward-pos',
          description: 'Number of QRL stakers, Proof-of-stake is still in development'
        },
        {
          title: 'Average Block Size',
          urlname: 'block-average-block-size',
          description: 'The Daily average block size of the Quantum Secure blockchain'
        },
        {
          title: 'Average Block Time',
          urlname: 'block-average-block-time',
          description: 'The Daily average block time of the Quantum Resistant Ledger blockchain'
        },
      ],
    };
  },

  computed: {},

  methods: {
    scrollMeTo(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop - 110;

      window.scrollTo({
        top: top,
        left: 0,
        behavior: 'smooth'
      });
    }
  },

  mounted() {},

}
</script>