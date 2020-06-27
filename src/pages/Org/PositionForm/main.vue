<template>
  <section class="product_brand_detail">
    <form-header>岗位管理</form-header>
    <el-row class="mt-10">
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="120px" :disabled="!isEdit">
          <el-form-item label="所属机构">
            <el-select v-model="form.orgNo"  filterable remote :remote-method="getorgNo" @clear="getorgNo" clearable placeholder="请选择">
              <el-option v-for="item in orgNoOptions" :key="item.id" :label="item.name" :value="item.orgNo"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位名称">
            <el-input v-model="form.postName"  placeholder="请输入岗位名称"></el-input>
          </el-form-item>
          <el-form-item label="岗位编码">
            <el-input v-model="form.postCode" placeholder="请输入岗位编码"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio v-for="item in statusOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
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
import { positionsSave, getPositionsById, getAllOrg } from '@/service/service.js'
import header from '@/pages/Components/formHeader/main'
export default {
  data () {
    return {
      form: {
        postName: '',
        postCode: '',
        remark: '',
        status: '',
        postSort: '1',
        orgNo: ''
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
      let res = await positionsSave(this.form)
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
      let res = await getPositionsById({ id })
      res.code === 200 && (this.form = res.data || this.form)
    }
  },
  created () {
    this.isEdit = !!((!this.$route.query.id) || this.$route.query.edit)
    this.$route.query.id !== undefined && this.getData(this.$route.query.id)
    this.getorgNo()
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
