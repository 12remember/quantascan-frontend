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

// Initialize Vue Router in history mode
const router = new VueRouter({
  mode: 'history',
  routes
});

// Configure Axios and analytics based on the environment
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  axios.defaults.baseURL = 'https://analytics.quantascan.io';
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
  Vue.use(VueGtag, {
    config: {
      id: process.env.GOOGLE_GTAG
    },
    appName: 'Quantascan.io',
    pageTrackerScreenviewEnabled: true
  }, router);
} else {
  axios.defaults.baseURL = 'http://127.0.0.1:8000';
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
}

// Retrieve the current version injected via environment variables
const currentVersion = process.env.VUE_APP_VERSION;
if (!currentVersion) {
  console.warn('No current version specified in VUE_APP_VERSION. Skipping version check.');
} else {
  // Expose the version for debugging in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    window.VUE_APP_VERSION = currentVersion;
  }

  const storedVersion = localStorage.getItem('appVersion');

  // If there's no stored version or the versions differ, clear caches and reload
  if (!storedVersion || storedVersion !== currentVersion) {
    console.log("🚀 New version detected! Clearing caches & reloading...");

    // Clear all browser caches
    if ('caches' in window) {
      caches.keys()
        .then(names => Promise.all(names.map(name => caches.delete(name))))
        .catch(err => console.error("Error clearing caches:", err));
    }

    // Unregister all service workers, if any exist
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations()
        .then(registrations => Promise.all(registrations.map(reg => reg.unregister())))
        .catch(err => console.error("Error unregistering service workers:", err));
    }

    // Update the stored version in localStorage to prevent an infinite reload loop
    localStorage.setItem('appVersion', currentVersion);

    // Reload the page to fetch the latest assets and HTML
    window.location.reload();
  }
}






new Vue({
  render: h => h(App),
  router
}).$mount('#app')