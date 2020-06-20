<template>
    <div class="product_category">
      <el-row >
        <el-col :span="4">
          <el-button type="primary" @click="create">新建</el-button>
        </el-col>
        <el-col :span="20">
          <el-form :form="query" label-width="120px">
            <el-col :span="7">
              <el-form-item label="应用名称">
                <el-input v-model="query.appName"  placeholder="请输入应用名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="应用标识">
                <el-input v-model="query.appKey"  placeholder="请输入应用标识"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="应用路径">
                <el-input v-model="query.path"  placeholder="请输入应用路径"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" class="text-right">
              <el-button type="primary" @click="getData">查询</el-button>
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
import { getAppByPage, deleteAppById } from '@/service/service.js'
import pagination from '@/mixins/pagination'
const formPath = '/h/application_detail'
export default {
  mixins: [pagination],
  data () {
    return {
      tableData: [],
      columns: [
        {
          label: '应用名称',
          prop: 'fdName'
        },
        {
          label: '应用标识',
          prop: 'fdKey'
        },
        {
          label: '应用域名',
          prop: 'fdDomain'
        },
        {
          label: '端口号',
          prop: 'fdPort'
        },
        {
          label: '应用路径',
          prop: 'fdPath'
        },
        {
          label: '全路径',
          prop: 'fdFullPath'
        },
        {
          label: '是否有效',
          prop: 'fdIsAvailable',
          formatter: (row, column, cellValue, index) => {
            return row.fdIsAvailable ? '是' : '否'
          }
        },
        {
          label: '描述',
          prop: 'fdDescription'
        }
      ],
      query: {
        appName: '',
        appKey: '',
        path: ''
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
        let res = await deleteAppById({ id: row.id })
        this.$handleRequestTip(res)
        res.code === 200 && this.getData()
      }).catch(() => {})
    },
    edit (row) {
      this.$router.push({ path: formPath, query: { id: row.id, edit: 1 } })
    },
    async getData () {
      let res = await getAppByPage({
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
  .brandLogo{
    width:55px;
  }
</style>
