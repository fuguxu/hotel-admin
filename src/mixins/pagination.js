export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    initQuery () {
      this.currentPage = 1
      this.pageSize = 10
      this.total = 0
    },
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
