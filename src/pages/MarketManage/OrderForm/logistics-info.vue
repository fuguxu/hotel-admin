<template>
  <el-row>
    <el-col :span="20">
      <block title="物流轨迹" class="mb-15">
        <el-row :class="$style['block-content']">
          <el-col :span="24" v-for="(item,index) in data.context" :key="index">
            <span v-html="item.context"></span>
          </el-col>
        </el-row>
      </block>
    </el-col>
  </el-row>
</template>
<script>
import { getOrderLogisticsInfo } from '@/service/service.js'
import block from '@/pages/Components/block/man'
export default {
  props: {
    orderNo: ''
  },
  components : {
    block
  },
  data () {
    return {
      data: {
        context: []
      }
    }
  },
  mounted() {
    this.getOrderLogisticsInfo()
  },
  methods: {
    async getOrderLogisticsInfo() {
      const { data } = await getOrderLogisticsInfo({
        orderNo: this.orderNo
      })
      if (data){
        data.context = data.context ? JSON.parse(data.context) : []
        this.data = data;
        console.log(this.data)
      }
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
