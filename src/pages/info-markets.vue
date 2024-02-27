<template>
<div>
  <!-- begin page-header -->
  <h1 class="page-header">Trade Quanta(QRL)</h1>
  <p class="page-description"> Exhanges and Swapping Services For Trading Quanta(QRL)</p>
  <!-- end page-header -->

  <!-- begin row -->
  <div class="row p-20 m-b-40">
    <h2 class=" col-xl-12 m-0">Exchanges</h2>
    <div class="d-flex justify-content-center align-items-center col-xl-4 col-md-6 col-sm-12" v-for="(item, index) in listExchanges" :key="index">
      <a class="d-flex align-items-center p-20" :href="item.href" target="_blank" rel="nofollow noopener">
        <img style="max-width:300px;" :src="require('../assets/logo/' + item.image)" :alt="item.alt">
      </a>
    </div>
  </div>
  <!-- end row -->


  <!-- begin row -->
  <div class="row p-20">
    <h2 class="col-xl-12 m-0">Securily Save it in a Coldstorage</h2>
    <div class="d-flex justify-content-center align-items-center col-xl-6 col-md-6 col-sm-12">
      <a class="d-flex flex-row align-items-center p-20" href="https://shop.ledger.com/products/ledger-nano-s" target="_blank"
        rel="nofollow noopener">
        <img width="300px" height="120px" :src="require('../assets/logo/logo-ledger.png')" alt="Nano Ledger S">
      </a>
    </div>
  </div>
  <!-- end row -->

</div>
</template>

<script>
export default {
  name: 'markets',
  metaInfo: {
    titleTemplate: '%s | Where to get QRL(Quanta)',
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "What to buy QRL(Quanta)? A list of exchanges and swappingservices to get Quanta."
      },
    ],
  },


  data() {
    return {
      isLoading: {},
      listExchanges: [
        {
          image: 'logo-mexc.svg',
          alt: 'MEXC logo',
          href: 'https://www.mexc.com/exchange/QRL_USDT',
          desc: '',
          width: '300px',

        },
        {
          image: 'logo-dex.png',
          alt: 'dex-trade logo',
          href: 'https://dex-trade.com/spot/trading/QRLUSDT',
          desc: '',
          width: '300px',

        },
        {
          image: 'logo-tidecoin.png',
          alt: 'Tidecoin logo',
          href: 'https://www.tidecoin.exchange/trading/qrlusdt',
          desc: '',
          width: '300px',

        },        
      ],



    };
  },



  computed: {},



  methods: {},

  created() {},

}
</script>