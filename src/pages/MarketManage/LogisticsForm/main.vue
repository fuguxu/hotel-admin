<template>
  <div>
    <logistics-info :orderNo="orderNo"></logistics-info>
  </div>
</template>
<script>
import logisticsInfo from '../OrderForm/logistics-info'
export default {
  components: {
    logisticsInfo
  },
  computed: {
    orderNo(){
      return this.$route.query.orderNo
    }
  }
}
</script>
