<template>
<div class="fade page-sidebar-fixed page-header-fixed show page-container" v-if="!pageOptions.pageEmpty" v-bind:class="{ 
		'page-content-full-height': pageOptions.pageContentFullHeight, 
		'page-without-sidebar': pageOptions.pageWithoutSidebar, 
		'page-sidebar-toggled': pageOptions.pageMobileSidebarToggled,
		'has-scroll': pageOptions.pageBodyScrollTop
	}">
  <Header />
  <div id="content" class="content"
    v-bind:class="{ 'content-full-width': pageOptions.pageContentFullWidth, 'content-inverse-mode': pageOptions.pageContentInverseMode, 'm-t-40':pageOptions.pageMobileMegaMenu && pageOptions.pageWindowidth <= 768 }">
    <router-view></router-view>
  </div>
  <Footer v-if="pageOptions.pageWithFooter" />
</div>
<div v-else>
  <router-view></router-view>
</div>
</template>

<script>
import Header from './components/header/Header.vue'
import Footer from './components/footer/Footer.vue'
import PageOptions from './config/PageOptions.vue'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  metaInfo: {
    title: 'QuantaScan',
    meta: [{
      name: 'robots',
      content: 'index,follow'
    }]
  },
  jsonld: {
    "@context": "https://schema.org",
    "name": "Quantascan",
    "description": "Quantascan gives insights in The Quantum Resistant Ledger(QRL) blockchain. Containing a richlist, charts for average blocksize and blocktime, number stakers and more.",
  },


  data() {
    return {
      pageOptions: PageOptions,
    }
  },
  methods: {
    handleScroll: function () {
      PageOptions.pageBodyScrollTop = window.scrollY;
    },

    handleResize() {
      PageOptions.pageWindowidth = window.innerWidth;
    }
  },
  mounted() {

  },
  created() {
    PageOptions.pageBodyScrollTop = window.scrollY;

    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize)

    this.$router.beforeEach((to, from, next) => {
      next()
    })
    this.$router.afterEach(() => {})
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
}
</script>
