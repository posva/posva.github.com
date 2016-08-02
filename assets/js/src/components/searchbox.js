import fetchival from 'fetchival'

const search = fetchival('https://EWN7R5RMAA-dsn.algolia.net/1/indexes/posva_blog', {
  headers: {
    'X-Algolia-API-Key': 'c089b4fed98dc56dae0ceecf48cb3f6f',
    'X-Algolia-Application-ID': 'EWN7R5RMAA'
  }
})

export default {
  data: function () {
    return {
      query: ''
    }
  },
  watch: {
    query: function (query) {
      const me = this
      me.queryId = me.queryId || 0
      const queryId = ++me.queryId
      if (query) {
        search.get({query: query})
          .then(function (results) {
            if (queryId === me.queryId) me.$emit('hits', results.hits)
          })
      } else {
        me.$emit('hits', [])
      }
    }
  }
}
