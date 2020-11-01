<template>
    <div class="order_detail">
      <el-tabs class="mb-10" type="border-card" v-model="currentComp" >
        <el-tab-pane v-for="item in tabs" :key="item.name" v-bind="item"></el-tab-pane>
      </el-tabs>
      <component :is="currentComp" :orderNo="orderNo"></component>
    </div>
</template>
<script>
import baseInfo from './base-info'
import logisticsInfo from './logistics-info'
import afterSaleInfo from './after-sale-info'
import evaluationInfo from './evaluation-info'
export default {
  data () {
    return {
      tabs: [
        {
          label: '基本信息',
          name: baseInfo
        },
        {
          label: '物流信息',
          name: logisticsInfo
        },
        {
          label: '售后信息',
          name: afterSaleInfo
        },
        {
          label: '评价信息',
          name: evaluationInfo
        },
      ],
      currentComp: baseInfo
    }
  },
  computed: {
    orderNo(){
      return this.$route.query.orderNo
    }
  },
  methods: {
  },
  created () {

  }
}
</script>
<style lang="scss" module>

</style>
<style  scoped>
.el-tabs--border-card{
    border-bottom: none;
    border-left: none;
    border-right: none;
    box-shadow: none;
  }
  .el-tabs--border-card >>> .el-tabs__content{
    display: none;
  }
</style>
