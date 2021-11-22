<template>
<!-- begin #footer -->
<div id="footer" class="footer d-flex flex-column">

  <div class=" footer-row d-flex col-lg-12 p-20 flex-wrap justify-content-between">
    <div class="footer-block d-flex flex-column col-lg-3 col-md-6">
      <div class="d-flex footer-title align-items-center m-b-20 m-t-10">
        <img class="m-r-5" width='40px' height='50px' :src="require('../../assets/Icon/qrl/white_100x100.png')" alt="Qrl Logo">QuantaScan
      </div>
      <p class="p-r-20 p-b-20"> A community made analytics site for QRL blockchain, an ecosystem secure against quantum computers</p>
      <div class="d-flex flex-column ">
        <div class="footer-title">
          About This Site
        </div>
        <div class="nav d-flex flex-column">
          <div class="d-flex">
            <router-link class="footer-item-link m-r-10" :to="{ name: 'info-site-faq', params: {} }">
              FAQ
            </router-link>
          </div>
          <div class="d-flex">
            <router-link class="footer-item-link m-r-10" :to="{ name: 'wallet-data', params: {qrl_address: this.donationAddress} }">
              Donations
            </router-link>
          </div>
          <div class="d-flex">
            <router-link class="footer-item-link m-r-10" :to="{ name: 'linkpartners', params: {} }">
              Linkpartners
            </router-link>
          </div>
          <div class="d-flex" v-if="showThis">
            <router-link class="footer-item-link m-r-10" :to="{ name: 'info-site-participating', params: {} }">
              Participating
            </router-link>
          </div>
        </div>
      </div>
    </div>


    <div class="footer-block d-flex flex-column col-lg-3 col-md-6">
      <div class="footer-title">
        Learn More
      </div>
      <div class="d-flex flex-row align-items-center">
        <a class="footer-item-link m-r-10" href="https://faqq.info/" target="_blank" rel="nofollow noopener">FAQ Quantum Computers & Blockchain
          <v-icon name="external-link-alt" scale="1" /></a>
      </div>
      <div class="d-flex flex-row align-items-center">
        <a class="footer-item-link m-r-10" href="https://github.com/theQRL/Whitepaper" target="_blank" rel="nofollow noopener">Whitepapers
          <v-icon name="external-link-alt" scale="1" /></a>
      </div>
      <div class="d-flex flex-row align-items-center">
        <a class="footer-item-link m-r-10" href="https://theqrl.org/protocol-updates/" target="_blank" rel="nofollow noopener">Roadmap
          <v-icon name="external-link-alt" scale="1" /></a>
      </div>
      <div class="d-flex flex-row align-items-center">
        <a class="footer-item-link m-r-10" href="https://theqrl.org/blog/" target="_blank" rel="nofollow noopener">Blog
          <v-icon name="external-link-alt" scale="1" /></a>
      </div>
      <div class="d-flex flex-row align-items-center">
        <a class="footer-item-link m-r-10" href="https://theqrl.org/#contributors" target="_blank" rel="nofollow noopener">Contributors
          <v-icon name="external-link-alt" scale="1" /></a>
      </div>
    </div>

    <div class="footer-block d-flex flex-column col-lg-3 col-md-6">
      <div class="footer-title">
        Offical QRL Resources
      </div>
      <div class="d-flex flex-row align-items-center">
        <a class="footer-item-link m-r-10" href="https://explorer.theqrl.org/" target="_blank" rel="nofollow noopener">Explorer
          <v-icon name="external-link-alt" scale="1" /></a>
      </div>
      <div class="d-flex flex-row align-items-center">
        <a class="footer-item-link m-r-10" href="https://wallet.theqrl.org/" target="_blank" rel="nofollow noopener">Web Wallet (Official)
          <v-icon name="external-link-alt" scale="1" /></a>
      </div>
      <div class="d-flex flex-row align-items-center">
        <a class="footer-item-link m-r-10" href="https://api.theqrl.org/" target="_blank" rel="nofollow noopener">API Documentation
          <v-icon name="external-link-alt" scale="1" /></a>
      </div>
      <div class="d-flex flex-row align-items-center">
        <a class="footer-item-link m-r-10" href="https://docs.theqrl.org/" target="_blank" rel="nofollow noopener">QRL Documentation
          <v-icon name="external-link-alt" scale="1" /></a>
      </div>
      <div class="d-flex flex-row align-items-center">
        <a class="footer-item-link m-r-10" href="https://github.com/theQRL/" target="_blank" rel="nofollow noopener">Github
          <v-icon name="external-link-alt" scale="1" /></a>
      </div>
    </div>

    <div class=" footer-block d-flex flex-column col-lg-3 col-md-6">
      <div class="footer-title">
        Get Involved
      </div>
      <div class="d-flex flex-row align-items-center">
        <a class="footer-item-link" href="https://medium.com/the-quantum-resistant-ledger" target="_blank" rel="nofollow noopener">
          <v-icon name="brands/medium" scale="2" />
          <p>Medium</p>
        </a>
      </div>
      <div class="d-flex flex-row align-items-center">
        <a class="footer-item-link" href="https://twitter.com/QRLedger" target="_blank" rel="nofollow noopener">
          <v-icon name="brands/twitter" scale="2" />
          <p>Twitter</p>
        </a>
      </div>
      <div class="d-flex flex-row align-items-center">
        <a class="footer-item-link" href="https://www.reddit.com/r/qrl" target="_blank" rel="nofollow noopener">
          <v-icon name="brands/reddit" scale="2" />
          <p>Reddit</p>
        </a>
      </div>
      <div class="d-flex flex-row align-items-center">
        <a class="footer-item-link" href="https://www.facebook.com/theqrl/" target="_blank" rel="nofollow noopener">
          <v-icon name="brands/facebook" scale="2" />
          <p>Facebook</p>
        </a>
      </div>
      <div class="d-flex flex-row align-items-center">
        <a class="footer-item-link" href="https://discord.gg/jBT6BEp" target="_blank" rel="nofollow noopener">
          <v-icon name="brands/discord" scale="2" />
          <p>Discord</p>
        </a>
      </div>
      <div class="d-flex flex-row align-items-center">
        <a class="footer-item-link" href="https://www.youtube.com/channel/UCS2PP3kR9APyRUa9kRH8-uA" target="_blank" rel="nofollow noopener">
          <v-icon name="brands/youtube" scale="2" />
          <p>Youtube</p>
        </a>
      </div>
    </div>
  </div>


  <div class="d-flex flex-column col-lg-12 p-20 justify-content-center align-items-center">
    <p style="font-size:22px">Support QuantaScan.io </p>
    <p>Send some Quanta for coffee during development</p>
    <div class="d-flex flex-row">
      <div class="d-flex flex-row copy-donation-address" @click="copyQRLAddress">
        <p class="break-word p-r-10">Q010500f5350cf6abf88d28ff2de85b0512ee57c31e8eb69fa39d6640fc0ceb37e4634554282609</p>
        <v-icon name="copy" scale="1" />
      </div>
    </div>

  </div>

  <div class="d-flex col-lg-12 p-20 justify-content-end">
    &copy; 2021 QuantaScan.io - By 12Remember @Discord
  </div>

</div>
<!-- end #footer -->
</template>

<script>
import PageOptions from '../../config/PageOptions.vue'

export default {
  name: 'Footer',
  data() {
    return {
      pageOptions: PageOptions,
      showThis: false,
      donationAddress: 'Q010500f5350cf6abf88d28ff2de85b0512ee57c31e8eb69fa39d6640fc0ceb37e4634554282609'
    }
  },
  methods: {
    copyQRLAddress() {
      this.$clipboard(this.donationAddress)
      this.$swal({
        position: 'top-end',
        icon: 'success',
        title: 'QRL Address Copied',
        text: 'Thank you in advance for supporting Quantascan.io',
        showConfirmButton: false,
        timer: 2500
      })

    }


  },


}
</script>
