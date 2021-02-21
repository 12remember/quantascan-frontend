<template>
<div>
  <!-- begin error -->
  <div class="error">
    <div class="error-code m-b-10">Coming Soon</div>
    <div class="error-content">
      <div class="error-message">This Page is still under construction</div>
      <div>
        <router-link to="/" class="btn btn-success p-l-20 p-r-20">Go to homepage</router-link>
      </div>
    </div>
  </div>
</div>
<!-- end error -->
</template>



<script>
import PageOptions from '../config/PageOptions.vue'

export default {
  created() {
    PageOptions.pageEmpty = false;
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    next();
  }
}
</script>
