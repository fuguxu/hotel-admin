<template>
  <div>
    <evaluation-info :id="id"></evaluation-info>
  </div>
</template>
<script>
import evaluationInfo from '../OrderForm/evaluation-info'
export default {
  components: {
    evaluationInfo
  },
  computed: {
    id(){
      return this.$route.query.id
    }
  }
}
</script>
