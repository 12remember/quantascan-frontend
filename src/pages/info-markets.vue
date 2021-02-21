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
        <img style="max-width:300px;" :width="item.width" :height="item.height" :src="require('../assets/logo/' + item.image)" :alt="item.alt">
      </a>
    </div>
  </div>
  <!-- end row -->

  <!-- begin row -->
  <div class="row p-20">
    <h2 class="col-xl-12 m-0">Services for Swapping Quanta(QRL)</h2>
    <div class="d-flex justify-content-center align-items-center col-xl-4 col-md-6 col-sm-12" v-for="(item, index) in listSwapServices" :key="index">
      <a class="d-flex align-items-center p-20" :href="item.href" target="_blank" rel="nofollow noopener">
        <img style="max-width:300px;" :width="item.width" :height="item.height" :src="require('../assets/logo/' + item.image)" :alt="item.alt">
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
          image: 'logo-cointiger.png',
          alt: 'Cointiger logo',
          href: 'https://www.cointiger.com/en-us/#/trade_center?coin=qrl_btc',
          desc: '',
          width: '300px',
          height: '58px'
        },
        {
          image: 'logo-bittrex-international.png',
          alt: 'Bittrex International logo',
          href: 'https://global.bittrex.com/Market/Index?MarketName=BTC-QRL',
          desc: '',
          width: '300px',
          height: '105px'
        },
        {
          image: 'logo-biteeu.png',
          alt: 'Biteeu logo',
          href: 'https://trade.biteeu.com/search',
          desc: '',
          width: '300px',
          height: '77px'
        },
        {
          image: 'logo-vcc-exchange.png',
          alt: 'VCC Exchange logo',
          href: 'https://vcc.exchange/exchange/basic?currency=btc&coin=qrl',
          name: 'VCC Exchange',
          desc: 'VCC Exchange is a centralized exchange that is based in Singapore, operates in Vietnam. Launched in May 2019',
          width: '300px',
          height: '163px'
        },
        {
          image: 'logo-bitvoicex.png',
          alt: 'Bitvoicex',
          href: 'https://bitvoicex.net/markets/qrl_btc',
          desc: '',
          width: '300px',
          height: '68px'
        }
      ],

      listSwapServices: [
        {
          image: 'logo-swapzone-io.png',
          alt: 'Swapzone logo',
          href: 'https://swapzone.io/?to=qrl',
          desc: '',
          width: '300px',
          height: '147px'
        },
        {
          image: 'logo-stealthex.png',
          alt: 'StealthEX logo',
          href: 'https://stealthex.io/coin/qrl',
          desc: '',
          width: '300px',
          height: '128px'
          }

          ]


    };
  },



  computed: {},



  methods: {},

  created() {},

}
</script>