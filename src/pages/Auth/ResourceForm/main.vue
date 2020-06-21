<template>
  <section class="product_brand_detail">
    <form-header>资源管理</form-header>
    <el-row class="mt-10">
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="120px" :disabled="!isEdit">
          <el-form-item label="资源名称">
            <el-input v-model="form.fdName"  placeholder="请输入资源名称"></el-input>
          </el-form-item>
          <el-form-item label="资源标识">
            <el-input v-model="form.fdKey" placeholder="请输入资源标识"></el-input>
          </el-form-item>
          <el-form-item label="资源路径">
            <el-input v-model="form.fdPath" placeholder="请输入资源路径"></el-input>
          </el-form-item>
          <el-form-item label="请求全路径">
            <el-input v-model="form.fdFullPath" placeholder="请输入请求全路径"></el-input>
          </el-form-item>
          <el-form-item label="包路径">
            <el-input v-model="form.fdPackagePath" placeholder="请输入包路径"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="form.fdOrder" placeholder="请输入排序"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-radio-group v-model="form.fdType">
              <el-radio v-for="item in TypeOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="校验规则">
            <el-radio-group v-model="form.fdExistValidation">
              <el-radio v-for="item in existValidationOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否登录可见">
            <el-radio-group v-model="form.fdLoginVisible">
              <el-radio v-for="item in loginVisibleOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否有效">
            <el-radio-group v-model="form.fdIsAvailable">
              <el-radio v-for="item in availableOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="权限验证表达式">
            <el-input v-model="form.fdValidationExpression" placeholder="请输入表达式"></el-input>
          </el-form-item>
          <el-form-item label="资源描述">
            <el-input v-model="form.fdDescription" placeholder="请输入资源描述"></el-input>
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
import { resourceSave, getResourceById } from '@/service/service.js'
import header from '@/pages/Components/formHeader/main'
export default {
  data () {
    return {
      form: {
        fdProjectKey: '',
        fdAppKey: '',
        fdName: '',
        fdKey: '',
        fdPath: '',
        fdPackagePath: '',
        fdDescription: '',
        fdOrder: '',
        fdIsAvailable: '',
        fdType: '',
        fdExistValidation: '',
        fdValidationExpression: '',
        fdLoginVisible: '',
        fdParentId: ''
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
      TypeOptions: [
        {
          label: '模块',
          value: 'M'
        },
        {
          label: '功能',
          value: 'F'
        }
      ],
      existValidationOptions: [
        {
          label: '是',
          value: true
        },
        {
          label: '否',
          value: false
        }
      ],
      loginVisibleOptions: [
        {
          label: '可见',
          value: 1
        },
        {
          label: '需验证',
          value: 0
        }
      ],
      isEdit: false
    }
  },
  methods: {
    async save () {
      let res = await resourceSave(this.form)
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
      let res = await getResourceById({ id })
      res.code === 200 && (this.form = res.data || this.form)
    }
  },
  created () {
    this.form.fdParentId = this.$route.query.fdParentId
    this.form.fdProjectKey = this.$route.query.fdProjectKey
    this.form.fdAppKey = this.$route.query.fdAppKey
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
