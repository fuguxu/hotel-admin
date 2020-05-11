<template>
  <section class="product_detail">
    <form-header>店铺管理</form-header>
    <el-row class="mt-10">
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="120px" :disabled="!isEdit">
          <el-form-item label="店铺名称">
            <el-input v-model="form.storeName"  placeholder="请输入店铺名称"></el-input>
          </el-form-item>
          <el-form-item label="店铺类型">
            <el-select v-model="form.type" placeholder="请选择">
              <el-option
                v-for="item in storeTypeOptions"
                :key="item.value"
                v-bind="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="form.totalSales" type="number" placeholder="请输入数量"></el-input>
          </el-form-item>
          <el-form-item label="关注人数">
            <el-input v-model="form.followAmount" type="number"  placeholder="请输入关注人数"></el-input>
          </el-form-item>
          <el-form-item label="店铺简介">
            <el-input v-model="form.introduction" placeholder="请输入店铺简介"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" placeholder="请输入店铺备注"></el-input>
          </el-form-item>
          <el-form-item label="店铺头像">
            <m-upload v-model="form.storePicture" :isShowDel="isEdit" dir="market/store"></m-upload>
          </el-form-item>
        </el-form>
        <div class="text-center">
            <el-button v-if="isEdit" @click="save" type="primary">保存</el-button>
            <el-button v-else @click="edit" type="primary">编辑</el-button>
            <el-button @click="goBack">返回</el-button>
        </div>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import { saveProductStroe, getProductStoreById } from '@/service/service.js'
import { storeTypeOptions } from '@/pages/MarketManage/config.json.js'
import header from '@/pages/Components/formHeader/main'
export default {
  data () {
    return {
      form: {
        storeName: '',
        type: '',
        introduction: '',
        remark: '',
        storePicture: '',
        totalSales: '',
        followAmount: ''
      },
      isEdit: false,
      storeTypeOptions: storeTypeOptions
    }
  },
  methods: {
    async save () {
      let res = await saveProductStroe(this.form)
      this.$handleRequestTip(res)
      res.code === 200 && this.goBack()
    },
    goBack () {
      this.$router.go(-1)
    },
    edit () {
      this.isEdit = true
    },
    async getData (id) {
      let res = await getProductStoreById({ id })
      res.code === 200 && (this.form = res.data || this.form)
    }
  },
  created () {
    this.isEdit = !!((!this.$route.query.id) || this.$route.query.edit)
    this.$route.query.id && this.getData(this.$route.query.id)
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
