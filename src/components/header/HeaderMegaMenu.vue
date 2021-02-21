<template>
<!-- begin navbar-collapse -->
<div class="collapse navbar-collapse" v-bind:class="{ 'd-block': pageOptions.pageMobileMegaMenu }">
  <ul class="nav navbar-nav">
    <b-nav-item-dropdown class="dropdown-lg" :key="$route.path">
      <template slot="button-content" class="d-flex align-items-center">
        Charts & Statistics
        <v-icon class=" p-l-5" name="caret-down" scale="1.5" />
      </template>
      <div class="row m-r-10 m-l-10">
        <div class="col-lg-4 col-md-4">
          <div class=" dropdown-header">Block</div>
          <ul class="nav d-flex align-items-start  flex-column p-b-30">
            <router-link class="d-flex" :to="{ name: 'block-average-block-size', params: {} }">
              Average Block Size
            </router-link>
            <router-link :to="{ name: 'block-average-block-time', params: {} }">
              Average Block Time
            </router-link>
            <router-link :to="{ name: 'block-reward-decay', params: {} }">
              Block Reward Decay
            </router-link>
          </ul>
        </div>
        <div class="col-lg-4 col-md-4">
          <div class="dropdown-header">Network</div>
          <ul class="nav d-flex align-items-start flex-column p-b-30">
            <router-link :to="{ name: 'network-transactions', params: {} }">
              Transaction Count/Volume
            </router-link>
            <router-link :to="{ name: 'network-transaction-fee', params: {} }">
              Transaction Fee
            </router-link>
            <router-link :to="{ name: 'network-total-circulating-quanta', params: {} }">
              Total Circulating Quanta
            </router-link>
            <router-link :to="{ name: 'network-transaction-exchange-volume', params: {} }" v-if="showThis">
              Exchange Transaction Volume
            </router-link>
          </ul>
        </div>
        <div class="col-lg-4 col-md-4">
          <div class="dropdown-header">Wallet</div>
          <ul class="nav d-flex align-items-start flex-column p-b-20">
            <router-link :to="{ name: 'wallet-distribution', params: {} }">
              Quanta Distribution
            </router-link>
            <router-link :to="{ name: 'wallet-rich-list', params: {} }">
              Rich List
            </router-link>
            <router-link :to="{ name: 'wallet-number-of-wallets', params: {} }">
              Number of Wallets
            </router-link>
            <router-link class="d-flex flex-row" :to="{ name: 'block-reward-pos', params: {} }">
              Stakers
              <span class="badge badge-secondary d-flex flex-wrap align-items-center m-l-5">POS In Development</span>
            </router-link>
            <router-link :to="{ name: 'wallet-type-of-holders', params: {} }" v-if="showThis">
              Type of Holders
            </router-link>
          </ul>
        </div>
        <div class="col-lg-4 col-md-4" v-if="showThis">
          <div class="dropdown-header">Tools</div>
          <ul class="nav d-flex flex-column">
            <router-link :to="{ name: 'tools-accumulation-calculator', params: {} }">
              Accumulation Calculator
            </router-link>
          </ul>
        </div>


      </div>
    </b-nav-item-dropdown>
  </ul>
</div>

<!-- end navbar-collapse -->
</template>

<script>
import PageOptions from '../../config/PageOptions.vue'

export default {
  name: 'HeaderMegaMenu',
  data() {
    return {
      pageOptions: PageOptions,
      showThis: false,
    }
  }
}
</script>
