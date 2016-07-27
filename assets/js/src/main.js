import Vue from 'vue/dist/vue.min.js'
import './canvas.js'
import Searchbox from './components/searchbox.js'

Vue.config.delimiters = ['${', '}']
Vue.component('searchbox', Searchbox)

window.vm = new Vue({
  el: 'body',
  data: {
    hits: []
  }
})
