<template>
    <div class="product_category">
      <el-row >
        <el-col :span="4">
          <el-button type="primary" @click="create">新建</el-button>
        </el-col>
        <el-col :span="20">
          <el-form :form="query" label-width="120px">
            <el-col :span="10">
              <el-form-item label="字典标识">
                <el-input v-model="query.dictKey"  placeholder="请输入字典标识"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="字典名称">
                <el-input v-model="query.dictName"  placeholder="请输入字典名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="text-right" :span="4">
              <el-button  type="primary" @click="getData">查询</el-button>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <m-table :data="tableData" :columns="columns"
       :showOperation="true"
       @operationHandler="operationHandler"
       @handlePagination="handlePagination"
       :currentPage="currentPage" :pageSize="pageSize" :total="total">
      </m-table>
    </div>
</template>
<script>
import { getDictByPage, deleteDict } from '@/service/service.js'
import pagination from '@/mixins/pagination'
const formPath = '/h/dict_detail'
export default {
  mixins: [pagination],
  data () {
    return {
      tableData: [],
      columns: [
        {
          label: '字典标识',
          prop: 'dictKey'
        },
        {
          label: '字典名称',
          prop: 'dictName'
        },
        {
          label: '状态',
          prop: 'status',
          formatter: (row, column, cellValue, index) => {
            return row.status === 1 ? '停用' : '正常'
          }
        },
        {
          label: '描述',
          prop: 'remark'
        }
      ],
      query: {
        dictName: '',
        dictKey: ''
      }
    }
  },
  methods: {
    create () {
      this.$router.push({ path: formPath })
    },
    detail (row) {
      this.$router.push({ path: formPath, query: { id: row.id } })
    },
    delete (row) {
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
        res.code === 200 && this.getData()
      }).catch(() => {})
    },
    edit (row) {
      this.$router.push({ path: formPath, query: { id: row.id, edit: 1 } })
    },
    async getData () {
      let res = await getDictByPage({
        ...this.query,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      if (res.code === 200) {
        this.tableData = (res.data ? res.data.records : [])
        this.total = res.data.total || 0
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="scss" module>
</style>
