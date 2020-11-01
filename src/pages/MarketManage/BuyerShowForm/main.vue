<template>
  <section class="product_detail">
    <form-header>买家秀管理</form-header>
    <el-row class="mt-10">
      <el-col :span="18">
        {{data.fdContent}}
      </el-col>
      <el-col :span="18">
        <el-col :span="12">
          {{data.createTime}}
        </el-col>
        <el-col :span="11" class="text-right">
          {{data.nickName}}
        </el-col>
      </el-col>
      <el-col :span="18">
        <el-col v-for="item in data.fileDetail" :key="item.id" :span="8">
          <img :src="item.imageUrl" alt="">
        </el-col>
      </el-col>
      <el-col :span="18">
        {{data.totalPoint}}人点赞
      </el-col>
      <el-col :span="12">
        <div class="text-center">
            <el-button type="primary">审核</el-button>
        </div>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import { getBuyerShowById } from '@/service/service.js'
import { storeTypeOptions } from '@/pages/MarketManage/config.json.js'
import header from '@/pages/Components/formHeader/main'
export default {
  data () {
    return {
      data: {
        fileDetail: []
      }
    }
  },
  methods: {
    async getData (id) {
      let res = await getBuyerShowById({ id })
      res.code === 200 && (this.data = res.data || this.form)
    }
  },
  created () {
   this.getData(this.$route.query.id)
  },
  computed: {
  },
  components: {
    formHeader: header
  }
}
</script>

<style lang="scss" module>
</style>
