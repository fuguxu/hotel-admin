<template>
  <section class="product_brand_detail">
    <form-header>
      基本信息
      <template slot="rightItem">
        <el-button v-if="isEdit" @click="save" type="primary">保存</el-button>
      </template>
    </form-header>
    <el-row class="mt-10">
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="120px" :disabled="!isEdit">
          <el-form-item label="字典名称">
            <el-input v-model="form.dictName"  placeholder="请输入字典名称"></el-input>
          </el-form-item>
          <el-form-item label="字典标识">
            <el-input v-model="form.dictKey" :disabled="form.id" placeholder="请输入字典标识"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status">
              <el-option label="正常" :value="0"></el-option>
              <el-option label="停用" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.remark" placeholder="请输入描述"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <form-header>
      字典条目
      <template slot="rightItem">
        <el-button v-if="isEdit" :disabled="!$route.query.id" @click="add" type="primary">添加</el-button>
      </template>
    </form-header>
    <m-table class="mt-10" :data="tableData" :columns="columns"
       :showPagination="false"
       :showOperation="false"
       >
        <template v-slot:col-itemKey="{scope}">
            <el-input v-model="scope.row.itemKey" :disabled="scope.row.id" placeholder="请输入条目标识"></el-input>
        </template>
        <template v-slot:col-itemValue="{scope}">
            <el-input v-model="scope.row.itemValue" :disabled="!isEdit" placeholder="请输入条目值"></el-input>
        </template>
        <template v-slot:col-itemName="{scope}">
            <el-input v-model="scope.row.itemName" :disabled="!isEdit" placeholder="请输入条目名称"></el-input>
        </template>
        <template v-slot:col-status="{scope}">
            <el-select v-model="scope.row.status" :disabled="!isEdit">
              <el-option label="正常" :value="0"></el-option>
              <el-option label="停用" :value="1"></el-option>
            </el-select>
        </template>
        <template v-slot:col-remark="{scope}">
            <el-input v-model="scope.row.remark" :disabled="!isEdit" placeholder="请输入备注"></el-input>
        </template>
        <template v-slot:col-operate="{scope}">
            <el-button type="primary" :disabled="!isEdit" @click="saveItem(scope)">保存</el-button>
            <el-button type="danger" :disabled="!isEdit" @click="deleteItem(scope)">删除</el-button>
        </template>
    </m-table>
    <div class="text-center mt-15">
        <el-button v-if="!isEdit" @click="edit" type="primary">编辑</el-button>
        <el-button @click="goBack">返回</el-button>
    </div>
  </section>
</template>
<script>
import { dictSave, getDictById, dictItemSave, getDictItemByPage, deleteDictItem } from '@/service/service.js'
import header from '@/pages/Components/formHeader/main'
export default {
  data () {
    return {
      form: {
        dictName: '',
        dictKey: '',
        remark: '',
        status: 0
      },
      tableData: [],
      columns: [
        {
          label: '序号',
          width: '50px',
          formatter: (row, column, cellValue, index) => {
            return index + 1
          }
        },
        {
          label: '条目标识',
          prop: 'itemKey',
          type: 'slot'
        },
        {
          label: '条目值',
          prop: 'itemValue',
          type: 'slot'
        },
        {
          label: '条目名称',
          prop: 'itemName',
          type: 'slot'
        },
        {
          label: '状态',
          prop: 'status',
          type: 'slot'
        },
        {
          label: '备注',
          prop: 'remark',
          type: 'slot'
        },
        {
          label: '操作',
          prop: 'operate',
          type: 'slot',
          width: '180px'
        }
      ],
      isEdit: false
    }
  },
  methods: {
    async save () {
      let res = await dictSave(this.form)
      this.$handleRequestTip(res)
      res.code === 200 && this.goBack()
    },
    goBack () {
      this.$router.go(-1)
    },
    edit () {
      this.isEdit = true
    },
    add () {
      this.tableData.push({
        itemValue: '',
        itemName: '',
        itemKey: '',
        status: 0,
        remark: ''
      })
    },
    async getData (id) {
      let res = await getDictById({ id })
      res.code === 200 && (this.form = res.data || this.form)
      this.getDictItem()
    },
    async getDictItem () {
      const { dictKey } = this.form
      let res = await getDictItemByPage({ dictKey, pageNo: 1, pageSize: 1000 })
      res.code === 200 && (this.tableData = res.data.records || [])
    },
    async saveItem (scope) {
      const { dictKey } = this.form
      let res = await dictItemSave({ ...scope.row, dictKey })
      this.$handleRequestTip(res)
      res.code === 200 && this.getDictItem()
    },
    deleteItem (scope) {
      this.$confirm('是否删除该数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          done()
        }
      }).then(async () => {
        if (scope.row.id) {
          let res = await deleteDictItem([scope.row.id])
          this.$handleRequestTip(res)
          res.code === 200 && this.getDictItem()
        } else {
          this.tableData.splice(scope.$index, 1)
        }
      }).catch(() => {})
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
