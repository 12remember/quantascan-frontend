<script>
const Home = () => import('../pages/Home.vue')

const chartPage = () => import('../pages/utils-chart-page.vue')
const statsPage = () => import('../pages/utils-stats-page.vue')
const fourZerofour = () => import('../pages/utils-404.vue')
//const underConstruction = () => import('../pages/utils-underconstruction.vue')
const walletDistribution = () => import('../pages/wallet-distribution.vue')
const walletRichList = () => import('../pages/wallet-rich-list.vue')
const walletNumberOfWallets = () => import('../pages/wallet-number-of-wallets.vue')
//const walletTypeOfHolders = () => import('../pages/wallet-type-of-holders.vue')
const blockBlockSize = () => import('../pages/block-block-size.vue')
const blockBlockTime = () => import('../pages/block-block-time.vue')
const blockRewardDecay = () => import('../pages/block-block-reward-decay.vue')
const blockRewardPOS = () => import('../pages/block-block-reward-pos.vue')
//const networkUniqueWalletsUsed = () => import('../pages/network-unique-wallets-used.vue')
const networkTransactions = () => import('../pages/network-transactions.vue')
const networkTotalCirculatingQuanta = () => import('../pages/network-total-circulating-quanta.vue')
const networkTransactionFee = () => import('../pages/network-transaction-fee.vue')
//const networkTransactionExchangeVolume = () => import('../pages/network-transaction-exchange-volume.vue')
const siteStatistics = () => import('../pages/info-statistics.vue')

//const toolsAccumulationCalculator = () => import('../pages/tools-accumulation-calculator.vue')
const walletData = () => import('../pages/wallet-data.vue')
const infoMarkets = () => import('../pages/info-markets.vue')
const infoSiteFAQ = () => import('../pages/info-site-faq.vue')
//const infoSiteParticipating = () => import('../pages/info-site-participating.vue')

const linkpartners = () => import('../pages/linkpartners.vue')


const router = (to, from, next) => {
  next();
  //  PageOptions.pageBodyScrollTop = window.scrollY;
  //PageOptions.pageBodyScrollTop = 0
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: router
  },
  {
    path: '*',
    name: 'unknown',
    redirect: {
      name: '404'
    }
  },
  {
    path: '/404',
    name: '404',
    component: fourZerofour,
    beforeEnter: router
  },

  {
    path: '/markets',
    name: 'markets',
    component: infoMarkets,
    beforeEnter: router
  },
  {
    path: '/siteFAQ',
    name: 'info-site-faq',
    component: infoSiteFAQ,
    beforeEnter: router
  },
  {
    path: '/linkpartners',
    name: 'linkpartners',
    component: linkpartners,
    beforeEnter: router
  },
    {
    path: '/site-statistics',
    name: 'siteStatistics',
    component: siteStatistics,
  },


//  {
//    path: '/blog',
//    name: 'info-blog',
//    component: underConstruction, //infoBlog
//    beforeEnter: router
//  },
//  {
//    path: '/participating',
//    name: 'info-site-participating',
//    component: infoSiteParticipating,
//    beforeEnter: router
//  },
  {
    path: '/chart',
    name: 'chart-page',
    component: chartPage,
    beforeEnter: router,
    children: [

      {
        path: '/wallet-distribution',
        name: 'wallet-distribution',
        component: walletDistribution,
        beforeEnter: router
        },
      {
        path: '/wallet-number-of-wallets',
        name: 'wallet-number-of-wallets',
        component: walletNumberOfWallets,
        beforeEnter: router
          },

      {
        path: '/block-avg-block-size',
        name: 'block-average-block-size',
        component: blockBlockSize,
        beforeEnter: router
          },
      {
        path: '/block-avg-block-time',
        name: 'block-average-block-time',
        component: blockBlockTime,
        beforeEnter: router
              },
      {
        path: '/block-reward-decay',
        name: 'block-reward-decay',
        component: blockRewardDecay,
        beforeEnter: router
      },
      {
        path: '/block-reward-pos',
        name: 'block-reward-pos',
        component: blockRewardPOS,
        beforeEnter: router
      },
    //  {
    //    path: '/network-unique-wallets-used',
    //    name: 'network-unique-wallets-used',
    //    component: networkUniqueWalletsUsed,
    //    beforeEnter: router
    //  },
      {
        path: '/network-transactions',
        name: 'network-transactions',
        component: networkTransactions,
        beforeEnter: router
      },
      {
        path: '/network-total-circulating-quanta',
        name: 'network-total-circulating-quanta',
        component: networkTotalCirculatingQuanta,
        beforeEnter: router
      },
      {
        path: '/network-transaction-fee',
        name: 'network-transaction-fee',
        component: networkTransactionFee,
        beforeEnter: router
      },
  //    {
  //      path: '/network-transaction-exchange-volume',
  //      name: 'network-transaction-exchange-volume',
  //      component: networkTransactionExchangeVolume,
  //      beforeEnter: router
  //    },


    ]
  },

  {
    path: '/stats',
    name: 'stats-page',
    component: statsPage,
    beforeEnter: router,
    children: [

      {
        path: '/wallet-rich-list',
        name: 'wallet-rich-list',
        component: walletRichList,
        beforeEnter: router
        },
      {
        path: '/wallet-data/:qrl_address',
        name: 'wallet-data',
        component: walletData,
        beforeEnter: router
        },
  //    {
  //      path: '/wallet-type-of-holders',
  //      name: 'wallet-type-of-holders',
  //      component: walletTypeOfHolders,
  //      beforeEnter: router
  //      },
  //    {
  //      path: '/tools-accumulation-calculator',
  //      name: 'tools-accumulation-calculator',
  //      component: toolsAccumulationCalculator,
  //      beforeEnter: router
  //        },
    ]
  },

]

export default routes;
</script>
