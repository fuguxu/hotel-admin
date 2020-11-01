<template>
  <el-row>
    <el-col :span="20">
      <block title="评价信息" class="mb-15">
        <el-row :class="$style['block-content']">
          <el-col :span="16">
            <span :class="$style.label">评价时间</span>
            <span ></span>
          </el-col>
          <el-col :span="8">
            <span :class="$style.label">总评分</span>
            <span >2020-12-3</span>
          </el-col>
          <el-col :span="16">
            <span :class="$style.label">是否匿名</span>
            <span >非匿名</span>
          </el-col>
          <el-col :span="8">
            <span :class="$style.label">买家账号</span>
            <span >134543534</span>
          </el-col>
          <el-col :span="16">
            <span :class="$style.label">商品符合度</span>
            <span >5分</span>
          </el-col>
          <el-col :span="8">
            <span :class="$style.label">店家服务态度</span>
            <span >5分</span>
          </el-col>
          <el-col :span="16">
            <span :class="$style.label">快递配送速度</span>
            <span >5分</span>
          </el-col>
          <el-col :span="8">
            <span :class="$style.label">快递员服务</span>
            <span >5分</span>
          </el-col>
          <el-col :span="16">
            <span :class="$style.label">快递包装</span>
            <span >5分</span>
          </el-col>
          <el-col :span="24">
            <span :class="$style.label">评价内容</span>
            <span >评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容</span>
          </el-col>
          <el-col :span="24">
            <span :class="$style.label">相关图片</span>
            <span ></span>
          </el-col>
          <el-col :span="24">
            <span :class="$style.label">回复评价内容</span>
            <span >sdg是豆腐干反对鬼地方高浮雕高浮雕广泛化工</span>
          </el-col>
        </el-row>
      </block>
      <el-col class="text-center" :span="24">
        <el-button @click="handleAfterSale" type="primary">回复评价</el-button>
      </el-col>
    </el-col>
    <el-dialog title="评价处理" :visible.sync="visible" width="40%">
      <el-form :model="form" label-width="50px">
        <el-form-item label="内容">
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
import { getOrderAppraiseInfo } from '@/service/service.js'
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
      form: {

      }
    }
  },
  mounted() {
    this.getOrderAppraiseInfo();
  },
  methods: {
    getOrderAppraiseInfo() {
      getOrderAppraiseInfo({
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
