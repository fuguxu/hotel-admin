<template>
  <section class="product_brand_detail">
    <form-header>产品品牌</form-header>
    <el-row class="mt-10">
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="120px" :disabled="!isEdit">
          <el-form-item label="品牌名称">
            <el-input v-model="form.brandName"  placeholder="请输入品牌名称"></el-input>
          </el-form-item>
          <el-form-item label="品牌网址">
            <el-input v-model="form.brandUrl" placeholder="请输入品牌网址"></el-input>
          </el-form-item>
          <el-form-item label="品牌描述">
            <el-input v-model="form.brandDesc" placeholder="请输入品牌描述"></el-input>
          </el-form-item>
          <el-form-item label="品牌LOGO">
            <m-upload v-model="form.brandLogo" :isShowDel="isEdit" dir="product/category"></m-upload>
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
import { saveProductBrand, getProductBrandById } from '@/service/service.js'
import header from '@/pages/Components/formHeader/main'
export default {
  data () {
    return {
      form: {
        brandName: '',
        brandUrl: '',
        brandDesc: '',
        brandLogo: '',
        isShow: true
      },
      isEdit: false
    }
  },
  methods: {
    async save () {
      let res = await saveProductBrand(this.form)
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
      let res = await getProductBrandById({ id })
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
