import Vue from 'vue'

import routes from './config/PageRoutes'
import axios from 'axios'

import VueRouter from 'vue-router'
import VueSlider from 'vue-slider-component'
import VueGoodTable from 'vue-good-table'
import VueMeta from 'vue-meta';
import HollowDotsSpinner from 'epic-spinners/src/components/lib/HollowDotsSpinner'
import Clipboard from 'v-clipboard'
import VueSweetalert2 from 'vue-sweetalert2';
import VueGtag from "vue-gtag";
import VueJsonLD from 'vue-jsonld'

// Highcharts 
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
//import highchartsmore from 'highcharts/highcharts-more'
//import mapInit from 'highcharts/modules/map'
//import treemap from 'highcharts/modules/treemap'
//import networkgraph from 'highcharts/modules/networkgraph'
import stockInit from 'highcharts/modules/stock'

// Bootstrap Components
import {
  NavPlugin,
} from 'bootstrap-vue';

// Font Awesome
import 'vue-awesome/icons/bars'
import 'vue-awesome/icons/caret-down'
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/copy'
import 'vue-awesome/icons/external-link-alt'
import 'vue-awesome/icons/link'
import 'vue-awesome/icons/exclamation'
import 'vue-awesome/icons/long-arrow-alt-right'
import 'vue-awesome/icons/brands/medium'
import 'vue-awesome/icons/brands/twitter'
import 'vue-awesome/icons/brands/reddit'
import 'vue-awesome/icons/brands/facebook'
import 'vue-awesome/icons/brands/discord'
import 'vue-awesome/icons/brands/youtube'
import Icon from 'vue-awesome/components/Icon'

// plugins css
import 'vue-good-table/dist/vue-good-table.css'
import 'vue-select/dist/vue-select.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import './theme/app.css'

import App from './App.vue'

Vue.config.productionTip = false


//general
Vue.use(VueRouter)
Vue.use(VueGoodTable)
Vue.use(Clipboard)
Vue.use(HighchartsVue, {
  tagName: 'Highcharts'
})
Vue.use(VueMeta);
Vue.use(VueSweetalert2);
Vue.use(VueJsonLD);
stockInit(Highcharts)
//mapInit(Highcharts)
//treemap(Highcharts)
//networkgraph(Highcharts)
//highchartsmore(Highcharts)

Vue.use(NavPlugin) //Bootstrap component
Vue.component('vue-slider', VueSlider)
Vue.component('loading-spinner-dot', HollowDotsSpinner)
Vue.component('v-icon', Icon)

const router = new VueRouter({
  mode: 'history',
  routes
})


if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'staging') {
  axios.defaults.baseURL = 'https://analytics.quantascan.io'
  axios.defaults.xsrfCookieName = 'csrftoken'
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
  Vue.use(VueGtag, {
    config: {
      id: process.env.GOOGLE_GTAG
    },
    appName: 'Quantascan.io',
    pageTrackerScreenviewEnabled: true
  }, router);

} else {
  //axios.defaults.baseURL = 'http://127.0.0.1:8000'
  axios.defaults.baseURL = 'https://analytics.quantascan.io'
  axios.defaults.xsrfCookieName = 'csrftoken'
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
}

const checkForUpdates = async () => {
  console.log('Checking for updates...');
  try {
    const response = await fetch('/version.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch version.json: ${response.status}`);
    }
    const { version } = await response.json();
    const currentVersion = localStorage.getItem('appVersion');

    console.log('Current version:', currentVersion);
    console.log('New version:', version);

    if (currentVersion && currentVersion !== version) {
      console.log('New version detected. Reloading...');
      localStorage.setItem('appVersion', version);
      window.location.reload(true); // Force reload
    } else {
      console.log('App is up-to-date.');
      localStorage.setItem('appVersion', version);
    }
  } catch (error) {
    console.error('Error checking for updates:', error);
  }
};

checkForUpdates();




new Vue({
  render: h => h(App),
  router
}).$mount('#app')