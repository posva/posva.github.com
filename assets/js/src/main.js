import Vue from 'vue/dist/vue.js'
import './canvas.js'
import Searchbox from './components/searchbox.js'
import fecha from 'fecha'

Vue.options.delimiters = ['${', '}']
Vue.component('searchbox', Searchbox)

Vue.filter('date', function (dateStr) {
  return dateStr
    ? fecha.format(new Date(dateStr), 'DD MMM YYYY')
    : ''
})

window.vm = new Vue({
  el: 'body',
  data: {
    hits: []
  }
})
