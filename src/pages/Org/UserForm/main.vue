<template>
  <section class="product_brand_detail">
    <form-header>用户管理</form-header>
    <el-row class="mt-10">
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="120px" :disabled="!isEdit">
          <el-form-item label="用户昵称">
            <el-input v-model="form.userName"  placeholder="请输入用户昵称"></el-input>
          </el-form-item>
          <el-form-item label="登录账号">
            <el-input  v-model="form.loginName" placeholder="请输入登录账号"></el-input>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input v-model="form.password" type="password" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱">
            <el-input v-model="form.email" placeholder="请输入用户邮箱"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="form.idCard" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="所属机构">
            <el-select v-model="form.orgNo" @change="changeOrg" filterable  placeholder="请选择">
              <el-option v-for="item in orgNoOptions" :key="item.id" :label="item.name" :value="item.orgNo"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-select v-model="form.deptId"  filterable   placeholder="请选择">
              <el-option v-for="item in deptOptions" :key="item.id" :label="item.deptName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属岗位">
            <el-select v-model="form.postIds"  filterable  multiple placeholder="请选择">
              <el-option v-for="item in positOptions" :key="item.id" :label="item.postName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属角色">
            <el-select v-model="form.roleIds" remote :remote-method="getRole" filterable  multiple placeholder="请选择">
              <el-option v-for="item in roleOptions" :key="item.id" :label="item.fdName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio v-for="item in sexOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio v-for="item in statusOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="头像">
            <m-upload v-model="form.avatar" :isShowDel="isEdit" dir="org/user"></m-upload>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
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
import { userInfoSave, getUserInfoById, getAllOrg, getAllDepts, getAllPositions, getRoleByPage } from '@/service/service.js'
import header from '@/pages/Components/formHeader/main'
export default {
  data () {
    return {
      form: {
        userName: '',
        loginName: '',
        password: '',
        email: '',
        idCard: '',
        phone: '',
        orgNo: '',
        deptId: '',
        postIds: [],
        roleIds: [],
        remark: '',
        status: '',
        avatar: ''
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
      sexOptions: [
        {
          label: '男',
          value: 0
        },
        {
          label: '女',
          value: 1
        }
      ],
      isEdit: false,
      orgNoOptions: [],
      deptOptions: [],
      positOptions: [],
      roleOptions: []
    }
  },
  methods: {
    async getorgNo () {
      let res = await getAllOrg()
      res.code === 200 && (this.orgNoOptions = res.data || [])
    },
    async getDept (orgNo) {
      if (!this.$route.query.id) {
        this.form.deptId = ''
        this.deptOptions = []
      }
      let res = await getAllDepts({ orgNo })
      res.code === 200 && (this.deptOptions = res.data || [])
    },
    async getPosit (orgNo) {
      if (!this.$route.query.id) {
        this.form.postIds = []
        this.positOptions = []
      }
      let res = await getAllPositions({ orgNo })
      res.code === 200 && (this.positOptions = res.data || [])
    },
    async getRole (roleName) {
      let res = await getRoleByPage({ roleName, projectKey: '' })
      res.code === 200 && (this.roleOptions = res.data.records || [])
    },
    changeOrg (orgNo) {
      this.getDept(orgNo)
      this.getPosit(orgNo)
    },
    async save () {
      let res = await userInfoSave(this.form)
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
      let res = await getUserInfoById({ id })
      res.code === 200 && (this.form = res.data || this.form) && this.changeOrg(this.form.orgNo)
    }
  },
  created () {
    this.isEdit = !!((!this.$route.query.id) || this.$route.query.edit)
    this.$route.query.id !== undefined && this.getData(this.$route.query.id)
    this.getorgNo()
    this.getRole()
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
