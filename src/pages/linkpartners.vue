<template>
<div>
  <!-- begin page-header -->
  <h1 class="page-header">Linkpartners</h1>
  <p class="page-description"> </p>
  <!-- end page-header -->

  <!-- begin row -->
  <div class="row p-b-40">
    <div class="col-xl-12 col-md-12 col-sm-12 d-flex justify-content-start">
      <div class="d-flex flex-column">
        <div class="d-flex flex-row align-items-center h3">
          <a class="" style="color: #fff;" href="https://coinmarketcap.com/" target="_blank" rel="dofollow">Coinmarketcap
            <v-icon name="external-link-alt" scale="1" /></a>
        </div>
        <div class="d-flex flex-row align-items-center h3">
          <a class="" style="color: #fff;" href="https://p2pq.trade/" target="_blank" rel="dofollow">P2PQ trade
            <v-icon name="external-link-alt" scale="1" /></a>
        </div>
      </div>
    </div>
  </div>
  <!-- end row -->





</div>
</template>

<script>
export default {
  name: 'faq',
  metaInfo: {
    titleTemplate: '%s | Frequently Asked Question about QuantaScan',
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Frequently Asked Question(FAQ) about QuantaScan, still got any more questions? get in touch."
      },
    ],
  },

  data() {
    return {
      isLoading: {},
      faqList: [
        {
          question: 'I see an bug or want to give feedback / suggestions',
          answer: 'Feedback and suggestions are welcome. Feel free to contact @ Discord 12remember'
        },
        {
          question: 'I want to make a donation',
          answer: 'Donations are always welcome, see site footer for QRL donation address'
        },
        {
          question: 'Still got a question!',
          answer: 'Feel free to contact @ Discord 12remember'
        },

]

    };
  },

  computed: {},



  methods: {},

  created() {},

}
</script>