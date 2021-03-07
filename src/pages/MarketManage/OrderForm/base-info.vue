<template>
  <el-row>
    <el-col :span="20">
      <block title="订单信息" class="mb-15">
        <el-row :class="$style['block-content']">
          <el-col :span="16">
            <span :class="$style.label">订单编号</span>
            <span >{{orderData.orderNo}}</span>
          </el-col>
          <el-col :span="8">
            <span :class="$style.label">商标标题</span>
            <span >{{orderData.productName}}</span>
          </el-col>
          <el-col :span="16">
            <span :class="$style.label">购买数量</span>
            <span >{{orderData.productCount}}</span>
          </el-col>
          <el-col :span="8">
            <span :class="$style.label">实收金额</span>
            <span >{{orderData.realTotalMoney | moneyFormat}}</span>
          </el-col>
          <el-col :span="16">
            <span :class="$style.label">订单状态</span>
            <span >{{orderData.orderStatus | orderStatusFormat}}</span>
          </el-col>
          <el-col :span="8">
            <span :class="$style.label">下单时间</span>
            <span >{{orderData.createTime}}</span>
          </el-col>
          <el-col :span="24">
            <span :class="$style.label">订单备注</span>
            <span >{{orderData.remark}}</span>
          </el-col>
          <el-col :span="24">
            <span :class="$style.label">商品规格</span>
            <span >{{orderData.productSkuInfo | skuInfoFormat}}</span>
          </el-col>
          <el-col :span="16">
            <span :class="$style.label">收货人</span>
            <span >{{orderData.detail.name}}</span>
          </el-col>
          <el-col :span="8">
            <span :class="$style.label">收货人联系方式</span>
            <span >{{orderData.detail.mobileNo}}</span>
          </el-col>
          <el-col :span="24">
            <span :class="$style.label">收货人地址</span>
            <span >{{orderData.detail.detailAddress}}</span>
          </el-col>
        </el-row>
      </block>
      <block title="支付信息">

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
    this.getData();
    this.getPaymentInfo();
  },
  methods: {
    async getData() {
      const res = await getOrderInfo({
        orderNo: this.orderNo
      })
      res.code === 200 && (this.orderData = res.data)
    },
    async getPaymentInfo () {
      getOrderPaymentInfo({
        orderNo: this.orderNo
      })
    }
  },
  filters: {
    moneyFormat(n){
      return accDiv(n, 100)
    },
    orderStatusFormat(n) {
      return (orderStatus.find(tab => tab.name === `${n}`) || {}).label
    },
    skuInfoFormat(n) {
      if (!n) return ;
      const skuInfo = JSON.parse(n);
      return Object.keys(skuInfo).map(key => {
        return `${key}:${skuInfo[key]}`
      }).join('，');
    }
  }
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
