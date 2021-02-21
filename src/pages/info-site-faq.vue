<template>
<div>
  <!-- begin page-header -->
  <h1 class="page-header">FAQ</h1>
  <p class="page-description"> Frequently Asked Questions about QuantaScan</p>
  <!-- end page-header -->

  <!-- begin row -->
  <div class="row p-b-40">
    <div class="col-xl-12 col-md-12 col-sm-12 d-flex justify-content-center">
      <div class="d-flex flex-column">
        <h2>Please note that this is an alpha version meaning:</h2>
        <ul style="font-size:16px">
          <li>Possible downtime</li>
          <li>Website UI is not perfect</li>
          <li>Missing Data, as of block 1273467 missing 204 transactions out of 2423352</li>
          <li>Data and calculations still needs be verified twice</li>
          <li>Inferior site speed</li>
        </ul>
      </div>
    </div>
  </div>
  <!-- end row -->

  <!-- begin row -->
  <div class="row">
    <div class="d-flex flex-column col-xl-8 col-md-9 col-sm-12" v-for="(item, index) in faqList" :key="index">
      <h3 class="p-t-30" style="color: var(--qrl-secundary);">
        {{item.question}}
      </h3>
      <p class="p-t-5" style="font-size:16px; color: var(--qrl-white);">
        {{item.answer}}
      </p>
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