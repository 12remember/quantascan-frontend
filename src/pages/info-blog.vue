<template>
<div>
  <!-- begin page-header -->
  <h1 class="page-header">QRL.network - FAQ</h1>
  <p class="page-description"> Frequently Asked Questions about QRL.network</p>
  <!-- end page-header -->
  <!-- begin row -->
  <div class="row p-40 m-40">
    <div class="d-flex flex-column col-xl-12" v-for="(item, index) in faqList" :key="index">
      <h3 class="p-t-30" style="color: var(--qrl-primary);">
        {{item.question}}
      </h3>
      <p class="p-t-5" style="font-size:16px; color: var(--qrl-primary-light);">
        {{item.awnser}}
      </p>
    </div>



    <div class="">

    </div>




  </div>
  <!-- end row -->


</div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: {},
      faqList: [
        {
          question: 'Are you fulltime programmers?',
          awnser: 'No, working in Healthcare '
        },
        {
          question: 'How do you obtain the data?',
          awnser: 'We get the data from the official Quantum Ledger Resistant Ledger Explorer API. Every x minute a script checks for new blocks and stores it in a PostgreSQL database'
        },
        {
          question: 'How do you process the data?',
          awnser: 'Data stored in the PostgreSQL database can be accessed by a Web browsable API (Django REST Framework). In a Part of the API request, data is calculated on request. The more heavy calculations will be done once a day and stored in an aggregation table in the PostgreSQL database.'
        },
        {
          question: 'How do you visualised the data?',
          awnser: 'With the use of Vue.js data given by the Django Rest Framwork will be visualised with different type of graphs, charts and tools'
        },
        {
          question: 'How about the servers?',
          awnser: 'We use two heroku dynos. One is running the front-end(vue.js) and the other is running Django Rest Framework. Data is stored on a Postgresql Database from Cloud Clusters located in the USA. Calculations and data gathering is done by an 4th server'
        },
        {
          question: 'Still got a question!',
          awnser: 'Feel free to contact us @ Discord (12remember / Rikuge) '
        },

]

    };
  },

  computed: {},



  methods: {},

  mounted() {},

}
</script>