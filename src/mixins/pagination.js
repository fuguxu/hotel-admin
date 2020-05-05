export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    operationHandler (row, index, type) {
      if (this[type]) this[type](row, index)
    },
    handlePagination (currentPage, pageSize) {
      this.currentPage = currentPage || this.currentPage
      this.pageSize = pageSize || this.pageSize
      this.getData && this.getData()
    }
  }
}
