<template>
  <el-row>
    <el-col :span="20">
      <block title="物流轨迹" class="mb-15">
        <el-row :class="$style['block-content']">
          <el-col :span="24">
            <span :class="$style.label">已签收</span>
            <span >广东省广州市天河区xxxxxxx,由xxx派送xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
          </el-col>
          <el-col :span="24">
            <span :class="$style.label">派送中</span>
            <span >广东省广州市天河区xxxxxxx,由xxx派送xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
          </el-col>
          <el-col :span="24">
            <span :class="$style.label">已揽件</span>
            <span >广东省广州市天河区xxxxxxx,由xxx派送xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
          </el-col>
        </el-row>
      </block>
    </el-col>
  </el-row>
</template>
<script>
import { getOrderInfo, getOrderPaymentInfo } from '@/service/service.js'
import { orderStatus } from '../config.json'
import block from '@/pages/Components/block/man'
import { accDiv } from '@/util/main'
export default {
  props: {
    orderNo: ''
  },
  components : {
    block
  },
  data () {
    return {
      orderData: {
        detail:{}
      }
    }
  },
  mounted() {

  },
  methods: {

  },
}
</script>
<style lang="scss" module>
  .block-content {
    padding: 10px 25px;
    line-height: 30px;
  }
  .label {
    margin-right: 10px;
  }
</style>
