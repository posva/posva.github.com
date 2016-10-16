import Vue from 'vue/dist/vue.js'
import fecha from 'fecha'
import striptags from 'striptags'
import truncate from 'truncate'
import 'whatwg-fetch'

import { initCanvas } from './canvas.js'
import Searchbox from './components/searchbox.js'

Vue.options.delimiters = ['${', '}']
Vue.component('searchbox', Searchbox)

Vue.filter('date', function (dateStr) {
  // Use the YYYY-MM-DD substring to fix inconsistent behaviour
  // between navigators new Date()
  return dateStr
    ? fecha.format(new Date(dateStr.substring(0, 10)), 'DD MMM YYYY')
    : ''
})

window.vm = new Vue({
  el: '#app',
  data: {
    hits: []
  },
  methods: {
    filterHtml: function (html) {
      return truncate(striptags(html), 100)
    }
  }
})

Vue.nextTick(initCanvas)
