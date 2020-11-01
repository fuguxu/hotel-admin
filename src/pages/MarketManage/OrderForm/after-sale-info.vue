<template>
  <el-row>
    <el-col :span="20">
      <block title="售后信息" class="mb-15">
        <el-row :class="$style['block-content']">
          <el-col :span="16">
            <span :class="$style.label">申请人</span>
            <span ></span>
          </el-col>
          <el-col :span="8">
            <span :class="$style.label">申请时间</span>
            <span >2020-12-3</span>
          </el-col>
          <el-col :span="16">
            <span :class="$style.label">订单号</span>
            <span >23243243435435</span>
          </el-col>
          <el-col :span="8">
            <span :class="$style.label">商品数量</span>
            <span >1</span>
          </el-col>
          <el-col :span="16">
            <span :class="$style.label">商品金额</span>
            <span >234</span>
          </el-col>
          <el-col :span="8">
            <span :class="$style.label">售后类型</span>
            <span >退货</span>
          </el-col>
          <el-col :span="24">
            <span :class="$style.label">申请原因</span>
            <span >sdgfdgdfggh第三个豆腐干豆腐干反对</span>
          </el-col>
          <el-col :span="16">
            <span :class="$style.label">受理时间</span>
            <span ></span>
          </el-col>
        </el-row>
      </block>

      <block title="处理进度" class="mb-15">
        <el-row :class="$style['block-content']">
          <el-col :span="24">
            <span :class="$style.label">xxx买家</span>
            <span >xxx申请退货，理由xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
          </el-col>
          <el-col :span="24">
            <span :class="$style.label">xxxx商家</span>
            <span >请提供货物不影响二次销售，凭证。谢谢</span>
          </el-col>
          <el-col :span="16">
            <span :class="$style.label">平台</span>
            <span >退货成功</span>
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
    <el-dialog title="售后处理" :visible.sync="visible" width="40%">
      <el-form :model="form" label-width="100px">
        <el-form-item label="售后类型" >
          退款
        </el-form-item>
        <el-form-item label="处理" >
          <el-select v-model="form.brandId"  clearable placeholder="请选择">
            <el-option v-for="item in hanldeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="买家补充" >
          <el-select v-model="form.brandId"  clearable placeholder="请选择">
            <el-option v-for="item in supplementOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="意见">
          <el-input type="textarea" v-model="form.name" placeholder="请输入" autocomplete="off"></el-input>
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
import { getOrderReturnInfo } from '@/service/service.js'
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
      visible: false,
      hanldeOptions: [{value: 'agree',label:'同意'},{value: 'unagree',label:'不同意'}],
      supplementOptions: [{value: 'agree',label:'上传凭证'},{value: 'unagree',label:'买家寄回商品'}],
      form: {

      }
    }
  },
  mounted() {
    this.getAfterSaleInfo();
  },
  methods: {
    getAfterSaleInfo() {
      getOrderReturnInfo({
        orderNo: this.orderNo
      })
    },
    save(){

    },
    handleAfterSale(){
      this.visible = true;
    }
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
