<template>
    <div class="product_category">
      <el-row class="mb-10">
        <el-form :form="query" label-width="120px">
          <el-col :span="6">
            <el-form-item label="店铺名称">
              <el-input v-model="query.brandName"  placeholder="请输入店铺名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button class="ml-10" type="primary" @click="getData">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
      <el-row class="mb-10">
        <el-col :span="12">
          <el-button type="primary" @click="create">新建</el-button>
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
import { getProductStore, deleteProductStore } from '@/service/service.js'
import { storeTypeOptions } from '@/pages/MarketManage/config.json.js'
import pagination from '@/mixins/pagination'
const { findByAttr } = require('@/util/main').default
const formPath = '/h/store_detail'
export default {
  mixins: [pagination],
  data () {
    return {
      tableData: [],
      columns: [
        {
          label: '店铺名称',
          prop: 'storeName'
        },
        {
          label: '店铺类型',
          prop: 'type',
          formatter: (row, col, cellValue, index) => {
            let type = findByAttr(storeTypeOptions, 'value', cellValue)
            console.log(type)
            return type ? type.label : ''
          }
        },
        {
          label: '销量',
          prop: 'totalSales'
        },
        {
          label: '关注人数',
          prop: 'followAmount'
        },
        {
          label: '店铺简介',
          prop: 'introduction'
        },
        {
          label: '备注',
          prop: 'remark'
        }
      ],
      query: {
        storeName: ''
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
        let res = await deleteProductStore({ id: row.id })
        this.$handleRequestTip(res)
        res.code === 200 && this.getData()
      }).catch(() => {})
    },
    edit (row) {
      this.$router.push({ path: formPath, query: { id: row.id, edit: 1 } })
    },
    async getData () {
      let res = await getProductStore({
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
