<template>
  <div>
    <after-sale-info :orderNo="orderNo"></after-sale-info>
  </div>
</template>
<script>
import afterSaleInfo from '../OrderForm/after-sale-info'
export default {
  components: {
    afterSaleInfo
  },
  computed: {
    orderNo() {
      return this.$route.query.orderNo
    }
  }
}
</script>
