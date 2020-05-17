<template>
    <div class="product_category">
      <el-row >
        <el-col :span="12">
          <el-button type="primary" @click="create">新建</el-button>
        </el-col>
        <el-col :span="12">
          <el-form :form="query" label-width="120px">
            <el-col :span="20">
              <el-form-item label="品牌名称">
                <el-input v-model="query.brandName"  placeholder="请输入品牌名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="text-right">
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
          <template v-slot:col-brandLogo="{scope}">
             <img :class="$style.brandLogo" :src="scope.row.brandLogo" alt="">
          </template>
          <template v-slot:col-brandUrl="{scope}">
             <a  :href="scope.row.brandUrl" target="__blank"><el-button type="text">{{scope.row.brandUrl}}</el-button></a>
          </template>
      </m-table>
    </div>
</template>
<script>
import { getProductBrand, deleteProductBrand } from '@/service/service.js'
import pagination from '@/mixins/pagination'
const formPath = '/h/product_brand_detail'
export default {
  mixins: [pagination],
  data () {
    return {
      tableData: [],
      columns: [
        {
          label: '品牌名称',
          prop: 'brandName'
        },
        {
          label: '品牌LOGO',
          prop: 'brandLogo',
          type: 'slot'
        },
        {
          label: '品牌网址',
          prop: 'brandUrl',
          type: 'slot'
        },
        {
          label: '品牌描述',
          prop: 'brandDesc'
        }
      ],
      query: {
        brandName: ''
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
        let res = await deleteProductBrand({ id: row.id })
        this.$handleRequestTip(res)
        res.code === 200 && this.getData()
      }).catch(() => {})
    },
    edit (row) {
      this.$router.push({ path: formPath, query: { id: row.id, edit: 1 } })
    },
    async getData () {
      let res = await getProductBrand({
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
