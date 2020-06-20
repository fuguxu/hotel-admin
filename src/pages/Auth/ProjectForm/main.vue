<template>
  <section class="product_brand_detail">
    <form-header>项目管理</form-header>
    <el-row class="mt-10">
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="120px" :disabled="!isEdit">
          <el-form-item label="项目名称">
            <el-input v-model="form.fdName"  placeholder="请输入项目名称"></el-input>
          </el-form-item>
          <el-form-item label="项目标识">
            <el-input v-model="form.fdKey" placeholder="请输入项目标识"></el-input>
          </el-form-item>
          <el-form-item label="项目域名">
            <el-input v-model="form.fdDomain" placeholder="请输入项目域名"></el-input>
          </el-form-item>
          <el-form-item label="项目路径">
            <el-input v-model="form.fdPath" placeholder="请输入项目路径"></el-input>
          </el-form-item>
          <el-form-item label="是否有效">
            <el-radio-group v-model="form.fdIsAvailable">
              <el-radio v-for="item in availableOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="项目描述">
            <el-input v-model="form.fdDescription" placeholder="请输入项目描述"></el-input>
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
import { projectSave, getProjectById } from '@/service/service.js'
import header from '@/pages/Components/formHeader/main'
export default {
  data () {
    return {
      form: {
        fdName: '',
        fdKey: '',
        fdDomain: '',
        fdPath: '',
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
      isEdit: false
    }
  },
  methods: {
    async save () {
      let res = await projectSave(this.form)
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
      let res = await getProjectById({ id })
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
