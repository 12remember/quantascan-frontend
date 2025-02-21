<template>
<div>
  <!-- begin #header -->
  <div id="header" class="header navbar-default">
    <!-- begin navbar-header -->
    <div class="navbar-header d-flex flex-shrink-0 m-r-20">
      <router-link :to="{ name: 'home'}" class="navbar-brand">
              <img 
        class="d-flex flex-shrink-1 lazy-logo" 
        width="50px" 
        height="50px" 
        :src="logoSrc" 
        alt="Qrl Logo" 
        loading="lazy"
      />
        <div style="position:relative">QuantaScan<span class="badge badge-primary"
            style="position:absolute; right:0px; bottom:-14px; padding: 1px 7px;">Alpha</span></div>
      </router-link>
      <button type="button" class="navbar-toggle p-10" aria-label="menu button" @click="toggleMobileMegaMenu" v-if="pageOptions.pageWithMegaMenu">
        <v-icon name="bars" scale="2" />
      </button>
    </div>
    <!-- end navbar-header -->

    <header-mega-menu v-if="pageOptions.pageWithMegaMenu"></header-mega-menu>

    <!-- begin header-nav -->
    <div class="navbar-nav navbar-right">
      <div class="navbar-form d-flex align-self-center flex-column">
        <label class="sr-only" for="searchBar">Search QRL Wallet</label>
        <form name="search_form">
          <div class="form-group">
            <input id="searchBar" v-model="inputSearchField" type="text" class="form-control p-r-30" placeholder="Search QRL Wallet" />
            <button type="submit" class="btn btn-search" aria-label="search" @click.stop.prevent="checkForm()">
              <v-icon name="search" scale="1" /></button>
          </div>
        </form>
      </div>

      <a href="https://www.theqrl.org/markets/" target="_blank" class="btn btn-primary m-10 d-flex align-items-center justify-content-center">
        <span class="m-0" style="font-size:18px;">Trade Quanta</span>
      </a>

    </div>
    <!-- end header navigation right -->


  </div>
  <!-- end #header -->
</div>
</template>

<script>
import PageOptions from '../../config/PageOptions.vue'
import HeaderMegaMenu from './HeaderMegaMenu.vue'

export default {
  name: 'Header',
  components: {
    HeaderMegaMenu
  },
  data() {
    return {
      pageOptions: PageOptions,
      inputSearchField: '',
      logoSrc: require('../../assets/Icon/qrl/orange_50x50.png') // Placeholder image
    }
  },
  mounted() {
    // Lazy-load the GIF logo
    const gifLogo = require('../../assets/logo/QuantaScan2-100.gif');
    const img = new Image();
    img.src = gifLogo;
    img.onload = () => {
      this.logoSrc = gifLogo; // Replace placeholder with GIF once loaded
    };
  },
  methods: {
    toggleMobileMegaMenu() {
      this.pageOptions.pageMobileMegaMenu = !this.pageOptions.pageMobileMegaMenu;
    },
    checkForm(e) {
      if (this.inputSearchField.length == 79 && this.inputSearchField.startsWith('Q')) {
        this.$router.push({
          name: 'wallet-data',
          params: {
            qrl_address: this.inputSearchField
          }
        });
      } else {
        this.$swal({
          position: 'top-end',
          icon: 'error',
          title: 'Invalid Address',
          text: 'Please in check the QRL Address',
          showConfirmButton: false,
          timer: 2000
        });
        e.preventDefault();
      }
    }
  }
};

</script>
