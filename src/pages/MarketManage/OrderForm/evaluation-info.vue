<template>
  <el-row>
    <el-col :span="20">
      <block title="评价信息" class="mb-15">
        <el-row :class="$style['block-content']">
          <el-col :span="16">
            <span :class="$style.label">评价时间</span>
            <span >{{data.createTime}}</span>
          </el-col>
          <el-col :span="8">
            <span :class="$style.label">总评分</span>
            <span >{{data.totalityScore}}分</span>
          </el-col>
          <el-col :span="16">
            <span :class="$style.label">是否匿名</span>
            <span >{{data.isAnon ? '匿名' : '非匿名'}}</span>
          </el-col>
          <el-col :span="8">
            <span :class="$style.label">买家昵称</span>
            <span >{{data.createBy}}</span>
          </el-col>
          <el-col :span="16">
            <span :class="$style.label">商品符合度</span>
            <span >{{data.productScore}}分</span>
          </el-col>
          <el-col :span="8">
            <span :class="$style.label">店家服务态度</span>
            <span >{{data.storeServiceScore}}分</span>
          </el-col>
          <el-col :span="16">
            <span :class="$style.label">快递配送速度</span>
            <span >{{data.deliverSpeedScore}}分</span>
          </el-col>
          <el-col :span="8">
            <span :class="$style.label">快递员服务</span>
            <span >{{data.deliverPersonScore}}分</span>
          </el-col>
          <el-col :span="16">
            <span :class="$style.label">快递包装</span>
            <span >{{data.deliverPackScore}}分</span>
          </el-col>
          <el-col :span="24">
            <span :class="$style.label">评价内容</span>
            <span >{{data.appraiseMsg}}</span>
          </el-col>
          <el-col :span="24">
            <span :class="$style.label">相关图片</span>
            <span ></span>
          </el-col>
          <el-col :span="24">
            <span :class="$style.label">回复评价内容</span>
            <span >感谢亲的支持，记得常来哟</span>
          </el-col>
        </el-row>
      </block>
      <el-col class="text-center" :span="24">
        <!-- <el-button @click="handleAfterSale" type="primary">回复评价</el-button> -->
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
import { getOrderAppraiseByPaId } from '@/service/service.js'
import block from '@/pages/Components/block/man'
export default {
  props: {
    id: ''
  },
  components : {
    block
  },
  data () {
    return {
      visible: false,
      form: {

      },
      data: {}
    }
  },
  mounted() {
    this.getOrderAppraiseInfo();
  },
  methods: {
    async getOrderAppraiseInfo() {
      const { data }  = await getOrderAppraiseByPaId({
        id: this.id
      })
      if (data) this.data = data;
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
