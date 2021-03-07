<template>
  <el-row>
    <el-col :span="20" v-if="data.orderNo">
      <block title="售后信息" class="mb-15">
        <el-row :class="$style['block-content']">
          <el-col :span="16">
            <span :class="$style.label">申请人</span>
            <span >{{data.createBy}}</span>
          </el-col>
          <el-col :span="8">
            <span :class="$style.label">申请时间</span>
            <span >{{data.createTime}}</span>
          </el-col>
          <el-col :span="16">
            <span :class="$style.label">订单号</span>
            <span >{{data.orderNo}}</span>
          </el-col>
          <el-col :span="8">
            <span :class="$style.label">商品数量</span>
            <span >{{data.productCount}}</span>
          </el-col>
          <el-col :span="16">
            <span :class="$style.label">商品金额</span>
            <span >{{data.productMoney | moneyFormat}}</span>
          </el-col>
          <el-col :span="8">
            <span :class="$style.label">售后类型</span>
            <span >{{data.type | statusFormat}}</span>
          </el-col>
          <el-col :span="24">
            <span :class="$style.label">申请原因</span>
            <span >{{data.reasonMsg}}</span>
          </el-col>
          <el-col :span="16">
            <span :class="$style.label">受理时间</span>
            <span >{{data.storeAcceptExpireTime}}</span>
          </el-col>
        </el-row>
      </block>

      <block title="协商过程记录" class="mb-15">
        <el-row :class="$style['block-content']">
          <el-col :span="24" v-for="(item, index) in (data.discussLogs || [])" :key="index">
            <span :class="$style.label">{{item.userType | userTypeFormat}}</span>
            <span >{{item.orderReturnsReason}}</span>
          </el-col>
        </el-row>
      </block>

      <block title="凭证" class="mb-15">
        <el-row :class="$style['block-content']">

        </el-row>
      </block>
      <el-col class="text-center" :span="24">
        <el-button @click="handleAfterSale" type="primary">处理售后</el-button>
      </el-col>
    </el-col>
    <el-col :class="$style['no-data']" v-else>
      暂无售后
    </el-col>
    <el-dialog title="售后处理" :visible.sync="visible" width="40%">
      <el-form :model="form" label-width="100px">
        <el-form-item label="售后类型" >
          {{data.type | statusFormat}}
        </el-form-item>
        <el-form-item label="处理" >
          <el-select v-model="form.handleResult"  clearable placeholder="请选择">
            <el-option v-for="item in hanldeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="买家补充" >
          <el-select v-model="form.brandId"  clearable placeholder="请选择">
            <el-option v-for="item in supplementOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="意见">
          <el-input type="textarea" v-model="form.remark" placeholder="请输入" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
import { getOrderReturnInfo, handleApply } from '@/service/service.js'
import { afterSaleType } from '../config.json'
import block from '@/pages/Components/block/man'
import { accDiv } from '@/util/main'
let userType = [{value: '0',label:'系统'},{value: '1',label:'商家'},{value: '2',label:'买家'}]
export default {
  props: {
    orderNo: ''
  },
  components : {
    block
  },
  data () {
    return {
      visible: false,
      hanldeOptions: [{value: '1',label:'同意'},{value: '2',label:'补充售后凭证'},{value: '3',label:'拒绝'}],
      supplementOptions: [{value: 'agree',label:'上传凭证'},{value: 'unagree',label:'买家寄回商品'}],
      form: {
        handleResult: '',
        remark: ''
      },
      data: {},
    }
  },
  mounted() {
    this.getAfterSaleInfo();
  },
  methods: {
    async getAfterSaleInfo() {
     const {data} = await getOrderReturnInfo({
        orderNo: this.orderNo
      })
      this.data = data || {}
    },
    async save(){
      let { type , id: orderReturnsApplyId} = this.data;
      let res = await handleApply({
        ...this.form,
        orderReturnsApplyId,
        type
      })
      this.$handleRequestTip(res)
      if (res.code === 200) {
        this.visible = false;
        this.getAfterSaleInfo();
      }
    },
    handleAfterSale(){
      this.visible = true;
    }
  },
  filters:{
    moneyFormat(n){
      return accDiv(n, 100)
    },
    statusFormat(n){
      return (afterSaleType.find(s => `${s.value}` === `${n}`) || {}).label
    },
    userTypeFormat(n) {
      return (userType.find(s => `${s.value}` === `${n}`) || {}).label
    }
  },
  computed:{

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
  .no-data {
    font-size: 14px;
  }
</style>
