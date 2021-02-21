<template>
<div>
  <!-- begin error -->
  <div class="error">
    <div class="error-code m-b-10">O no</div>
    <div class="error-content">
      <div class="error-message">We couldn't find it...</div>
      <div class="error-desc m-b-30">
        The page you're looking for doesn't exist. <br />
      </div>
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
