import Vue from 'vue/dist/vue.js'
import fecha from 'fecha'
import striptags from 'striptags'
import truncate from 'truncate'

import { initCanvas } from './canvas.js'
import Searchbox from './components/searchbox.js'

Vue.options.delimiters = ['${', '}']
Vue.component('searchbox', Searchbox)

Vue.filter('date', function (dateStr) {
  return dateStr
    ? fecha.format(new Date(dateStr), 'DD MMM YYYY')
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
