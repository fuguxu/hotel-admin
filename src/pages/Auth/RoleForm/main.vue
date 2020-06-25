<template>
  <section class="product_brand_detail">
    <form-header>角色管理</form-header>
    <el-row class="mt-10">
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="120px" :disabled="!isEdit">
          <el-form-item label="角色名称">
            <el-input v-model="form.fdName"  placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="角色标识">
            <el-input v-model="form.fdKey" placeholder="请输入角色标识"></el-input>
          </el-form-item>
          <el-form-item label="所属项目">
            <el-select v-model="form.projectKey" filterable remote  placeholder="请选择">
              <el-option v-for="item in projectOptions" :key="item.id" :label="item.fdName" :value="item.fdKey"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否有效">
            <el-radio-group v-model="form.fdIsAvailable">
              <el-radio v-for="item in availableOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="form.fdDescription" placeholder="请输入角色描述"></el-input>
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
import { roleSave, getRoleById, getAllProject } from '@/service/service.js'
import header from '@/pages/Components/formHeader/main'
export default {
  data () {
    return {
      form: {
        fdName: '',
        fdKey: '',
        projectKey: '',
        fdDescription: '',
        fdIsAvailable: ''
      },
      availableOptions: [
        {
          label: '是',
          value: true
        },
        {
          label: '否',
          value: false
        }
      ],
      isEdit: false,
      projectOptions: []
    }
  },
  methods: {
    async getProject (name) {
      let res = await getAllProject()
      if (res.code === 200) {
        this.projectOptions = (res.data ? res.data : [])
      }
      return this.projectOptions
    },
    async save () {
      let res = await roleSave(this.form)
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
      let res = await getRoleById({ id })
      if (res.code === 200) {
        this.form = res.data || this.form
      }
    }
  },
  created () {
    this.isEdit = !!((!this.$route.query.id) || this.$route.query.edit)
    this.$route.query.id && this.getData(this.$route.query.id)
    this.getProject()
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
