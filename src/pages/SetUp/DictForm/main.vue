<template>
  <section class="product_brand_detail">
    <form-header>基本信息</form-header>
    <el-row class="mt-10">
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="120px" :disabled="!isEdit">
          <el-form-item label="字典名称">
            <el-input v-model="form.dictName"  placeholder="请输入字典名称"></el-input>
          </el-form-item>
          <el-form-item label="字典标识">
            <el-input v-model="form.dictKey" placeholder="请输入字典标识"></el-input>
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
    <form-header>字典条目</form-header>
    <el-button type="primary" class="mt-10" @click="add">添加</el-button>
    <m-table class="mt-10" :data="tableData" :columns="columns"
       :showPagination="false"
       :showOperation="false"
       >
        <template v-slot:col-itemKey="{scope}">
            <el-input v-model="scope.row.itemKey" :disabled="!isEdit" placeholder="请输入条目标识"></el-input>
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
            <el-button type="danger" @click="deleteItem(scope)">删除</el-button>
        </template>
    </m-table>
    <div class="text-center mt-15">
        <el-button v-if="isEdit" @click="save" type="primary">保存</el-button>
        <el-button v-else @click="edit" type="primary">编辑</el-button>
        <el-button @click="goBack">返回</el-button>
    </div>
  </section>
</template>
<script>
import { dictSave, getDictById } from '@/service/service.js'
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
          width: '100px'
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
        itemKey: '',
        itemName: '',
        status: 0,
        remark: ''
      })
    },
    async getData (id) {
      let res = await getDictById({ id })
      res.code === 200 && (this.form = res.data || this.form)
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
        let res = await deleteDict([row.id])
        this.$handleRequestTip(res)
        // res.code === 200 && this.getData()
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
