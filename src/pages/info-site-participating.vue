<template>
<div>
  <!-- begin page-header -->
  <h1 class="page-header">Participating</h1>
  <p class="page-description">Participate in the growth of QRL and QuantaScan</p>
  <!-- end page-header -->
  <!-- begin row -->
  <div class="row">

    <h2 class="d-flex">
      Participants
    </h2>

    <div class="d-flex flex-column col-xl-6 col-md-9 col-sm-12" v-for="(item, index) in helpList" :key="index">
      <h3 class="p-t-30" style="color: var(--qrl-secundary);">
        {{item.person}}
      </h3>
      <p class="p-t-5" style="font-size:16px; color: var(--qrl-white);">
        {{item.did}}
      </p>
    </div>
  </div>
  <!-- end row -->
  <!-- begin row -->
  <div class="row">
    <div class="d-flex flex-column col-xl-6 col-md-9 col-sm-12" v-for="(item, index) in helpNeededList" :key="index">
      <h3 class="p-t-30" style="color: var(--qrl-secundary);">
        {{item.kind}}
      </h3>
      <p class="p-t-5" style="font-size:16px; color: var(--qrl-white);">
        {{item.by}}
      </p>
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
      helpList: [
        {
          person: 'Rikuge @discord',
          did: 'Helped with fixing bugs in calculations '
        },

      ],
      helpNeededList: [
        {
          kind: 'Everyone',
          by: 'If you see a bug , let me know @discord(12remember)'
        },
      ]

    };
  },

  computed: {},



  methods: {},

  created() {},

}
</script>