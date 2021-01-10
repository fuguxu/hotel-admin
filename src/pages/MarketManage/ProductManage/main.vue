<template>
    <div class="product_category">
      <el-row >
        <el-col :span="7">
          <el-button type="primary" @click="create">新增</el-button>
          <el-button @click="upDown(1)">上架</el-button>
          <el-button @click="upDown(0)">下架</el-button>
          <el-button @click="deleteMuli">删除</el-button>
        </el-col>
        <el-col :span="17">
          <el-form :form="query" label-width="120px">
            <el-col :span="10">
              <el-form-item label="产品名称">
                <el-input v-model="query.productName"  placeholder="请输入产品名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="状态">
                <el-select v-model="query.publishStatus" clearable>
                  <el-option label="上架" :value="1"></el-option>
                  <el-option label="下架" :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="text-right">
              <el-button type="primary" @click="getData">查询</el-button>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <m-table :data="tableData" :columns="columns"
        ref="table"
       :showOperation="false"
       @handlePagination="handlePagination"
       :currentPage="currentPage" :pageSize="pageSize" :total="total">
        <template v-slot:col-operate="{scope}">
          <el-button  type="primary" @click="operationHandler(scope.row, scope.$index, 'edit')" size="mini">编辑</el-button>
          <el-button v-if="scope.row.publishStatus === 0" @click="operationHandler(scope.row, scope.$index, 'up')" size="mini">上架</el-button>
          <el-button v-if="scope.row.publishStatus === 1"  @click="operationHandler(scope.row, scope.$index, 'down')" size="mini">下架</el-button>
          <el-button @click="operationHandler(scope.row, scope.$index, 'delete')" size="mini">删除</el-button>
        </template>
      </m-table>
    </div>
</template>
<script>
import { getProduct, deleteProduct, handleProduct } from '@/service/service.js'
import { accDiv } from '@/util/main'
import pagination from '@/mixins/pagination'
const publishPath = '/h/product_publish'
const formPath = '/h/product_detail'
export default {
  mixins: [pagination],
  data () {
    return {
      tableData: [],
      columns: [
        {
          type: 'selection',
          width: '50px'
        },
        {
          label: '产品名称',
          prop: 'productName'
        },
        {
          label: '产品简介',
          prop: 'productProfile'
        },
        {
          label: '售价(元)',
          prop: 'salePrice',
          formatter: (row, column, cellValue, index) => {
            return accDiv(row.salePrice, 100)
          }
        },
        {
          label: '原价(元)',
          prop: 'originalPrice',
          formatter: (row, column, cellValue, index) => {
            return accDiv(row.originalPrice, 100)
          }
        },
        {
          label: '销量',
          prop: 'totalSales'
        },
        {
          label: '状态',
          prop: 'publishStatus',
          formatter: (row, column, cellValue, index) => {
            return row.publishStatus === 0 ? '下架' : '上架'
          }
        },
        {
          label: '操作',
          prop: 'operate',
          type: 'slot',
          width: '230px'
        }
      ],
      query: {
        productName: '',
        publishStatus: ''
      }
    }
  },
  methods: {
    create () {
      this.$router.push({ path: publishPath })
    },
    detail (row) {
      this.$router.push({ path: formPath, query: { id: row.id } })
    },
    delete (row) {
      let ids = row.id ? [row.id] : row
      this.$confirm('是否删除该数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          done()
        }
      }).then(async () => {
        let res = await deleteProduct(ids)
        this.$handleRequestTip(res)
        res.code === 200 && this.getData()
      }).catch(() => {})
    },
    getSelection () {
      return this.$refs.table.getSelection()
    },
    deleteMuli () {
      let data = this.getSelection()
      if (data.length) {
        let ids = data.map(it => it.id)
        this.delete(ids)
      }
    },
    async handleProduct (status, params) {
      let res = await handleProduct(params, {
        publishStatus: status
      })
      this.$handleRequestTip(res)
      res.code === 200 && this.getData()
    },
    upDown (status) {
      let data = this.getSelection()
      let ids = data.map(it => it.id)
      this.handleProduct(status, ids)
    },
    up (row) {
      this.handleProduct(1, [row.id])
    },
    down (row) {
      this.handleProduct(0, [row.id])
    },
    edit (row) {
      this.$router.push({ path: formPath, query: { id: row.id, edit: 1 } })
    },
    async getData () {
      let res = await getProduct({
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
