<template>
  <section class="product_brand_detail">
    <form-header>机构管理</form-header>
    <el-row class="mt-10">
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="120px" :disabled="!isEdit">
          <el-form-item label="机构全称">
            <el-input v-model="form.name"  placeholder="请输入机构全称"></el-input>
          </el-form-item>
          <el-form-item label="机构简称">
            <el-input v-model="form.shortName" placeholder="请输入机构简称"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.mobileNo" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="机构代码">
            <el-input v-model="form.orgCode" placeholder="请输入机构代码"></el-input>
          </el-form-item>
          <el-form-item label="机构评级">
            <el-input v-model="form.orgGrade" placeholder="请输入机构评级"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="form.detailAddr" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio v-for="item in statusOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="机构简介">
            <el-input v-model="form.briefIntro" placeholder="请输入机构简介"></el-input>
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
import { OrgSave, getOrgById } from '@/service/service.js'
import header from '@/pages/Components/formHeader/main'
export default {
  data () {
    return {
      form: {
        name: '',
        mobileNo: '',
        orgCode: '',
        shortName: '',
        briefIntro: '',
        email: '',
        status: '',
        detailAddr: '',
        parentOrgNo: ''
      },
      statusOptions: [
        {
          label: '正常',
          value: 0
        },
        {
          label: '禁用',
          value: 1
        }
      ],
      isEdit: false
    }
  },
  methods: {
    async save () {
      let res = await OrgSave(this.form)
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
      let res = await getOrgById({ id })
      res.code === 200 && (this.form = res.data || this.form)
    }
  },
  created () {
    this.form.parentOrgNo = this.$route.query.parentOrgNo
    this.isEdit = !!((!this.$route.query.id) || this.$route.query.edit)
    this.$route.query.id !== undefined && this.getData(this.$route.query.id)
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
