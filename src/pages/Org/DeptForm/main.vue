<template>
  <section class="product_brand_detail">
    <form-header>部门管理</form-header>
    <el-row class="mt-10">
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="120px" :disabled="!isEdit">
          <el-form-item label="所属机构">
            <el-select v-model="form.orgNo" :disabled="isDisabledOrg" filterable remote :remote-method="getorgNo" @clear="getorgNo" clearable placeholder="请选择">
              <el-option v-for="item in orgNoOptions" :key="item.id" :label="item.name" :value="item.orgNo"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="form.deptName"  placeholder="请输入部门名称"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model="form.leader" placeholder="请输入负责人"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio v-for="item in statusOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
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
import { deptSave, getDeptById, getAllOrg } from '@/service/service.js'
import header from '@/pages/Components/formHeader/main'
export default {
  data () {
    return {
      form: {
        deptName: '',
        email: '',
        phone: '',
        leader: '',
        status: '',
        parentId: '',
        orgNo: ''
      },
      statusOptions: [
        {
          label: '正常',
          value: 1
        },
        {
          label: '禁用',
          value: 0
        }
      ],
      isEdit: false,
      orgNoOptions: []
    }
  },
  methods: {
    async getorgNo () {
      let res = await getAllOrg()
      res.code === 200 && (this.orgNoOptions = res.data || [])
    },
    async save () {
      let res = await deptSave(this.form)
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
      let res = await getDeptById({ id })
      res.code === 200 && (this.form = res.data || this.form)
    }
  },
  created () {
    this.form.parentId = this.$route.query.parentId
    this.form.orgNo = this.$route.query.orgNo
    this.isEdit = !!((!this.$route.query.id) || this.$route.query.edit)
    this.$route.query.id !== undefined && this.getData(this.$route.query.id)
    this.getorgNo()
  },
  computed: {
    isDisabledOrg () {
      return Object.keys(this.$route.query).length !== 0
    }
  },
  components: {
    formHeader: header
  }
}
</script>

<style lang="scss" module>
</style>
