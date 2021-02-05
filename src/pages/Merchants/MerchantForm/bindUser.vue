<template>
  <section class="product_brand_detail">
    <el-row class="mt-10">
      <el-col :span="24">
        <el-form ref="form" :model="form" label-width="120px" :disabled="!isEdit">
          <el-col :span="12">
            <el-form-item label="用户手机号">
              <el-input :disabled="isBinded" v-model="form.mobileNo" placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
      <div class="text-center">
          <el-button v-if="isEdit" :disabled="isBinded" @click="save" type="primary">保存</el-button>
          <el-button v-else @click="edit" type="primary">编辑</el-button>
          <el-button @click="goBack">返回</el-button>
      </div>
    </el-row>
  </section>
</template>
<script>
import { bindUser, getBindUser } from '@/service/service.js'
export default {
  name: 'merchant-info',
  props: {
    merchantId: {
      default: ''
    },
  },
  data () {
    return {
      form: {
        mobileNo: '',
      },
      isEdit: false,
      isBinded: false
    }
  },
  methods: {
    async save () {
      let res = await bindUser({...this.form, merchantId: this.merchantId})
      this.$handleRequestTip(res)
      res.code === 200 && (this.isBinded = true);
    },
    goBack () {
      this.$router.go(-1)
    },
    edit () {
      this.isEdit = true
    },
    async getData (merchantId) {
      let res = await getBindUser({ merchantId })
      if (res.code === 200 && res.data && res.data[0]) {
        this.form.mobileNo = res.data[0].mobileNo;
        this.isBinded = true;
      }
    }
  },
  activated () {
    this.isEdit = !!((!this.$route.query.id) || this.$route.query.edit)
    this.merchantId && this.getData(this.merchantId)
  },
  computed: {
  }
}
</script>

<style lang="scss" module>
</style>
