<template>
    <div class="product_category">
      <el-row class="mb-10">
        <el-col :span="24">
          <el-form :form="query" label-width="120px">
            <el-col :span="24">
              <el-button  type="primary" @click="add">新增</el-button>
              <el-button  type="primary" @click="deletes">删除</el-button>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <m-table :data="tableData" :columns="columns"
       :showOperation="false"
       :showPagination="false"
       @operationHandler="operationHandler"
       @selection-change="selectChange"
       @handlePagination="handlePagination"
       :currentPage="currentPage" :pageSize="pageSize" :total="total">
          <template v-slot:col-operate="{scope}">
            <el-button  @click="operationHandler(scope.row, scope.$index, 'edit')" size="mini">修改</el-button>
            <!-- <el-button type="danger" @click="operationHandler(scope.row, scope.$index, 'delete')" size="mini">删除</el-button> -->
          </template>
      </m-table>
    </div>
</template>
<script>
import pagination from '@/mixins/pagination'
import { getMerchantAccountList, deleteMerchantAccountById } from '@/service/service'
let selectionDatas = []
const accountTypeOptions = [
  {
    label: '微信',
    value: 0
  },
  {
    label: '支付宝',
    value: 1
  },
  {
    label: '银行卡',
    value: 2
  }
]
export default {
  name: 'merchant-info-list',
  props: {
    merchantId: {
      default: ''
    }
  },
  mixins: [pagination],
  data () {
    return {
      tableData: [],
      columns: [
        {
          type: 'selection'
        },
        {
          label: '账户类型',
          prop: 'accountType',
          formatter: (row, column, cellValue, index) => {
            return (accountTypeOptions.find(item => item.value === row.accountType) || {}).label
          }
        },
        {
          label: '账户名',
          prop: 'accountName'
        },
        {
          label: '账号',
          prop: 'accountNo'
        },
        {
          label: '状态',
          prop: 'status',
          formatter: (row, column, cellValue, index) => {
            return row.status ? '正常' : '冻结'
          }
        },
        {
          label: '是否默认',
          prop: 'isDefault',
          formatter: (row, column, cellValue, index) => {
            return row.isDefault ? '是' : '否'
          }
        },
        {
          label: '创建时间',
          prop: 'createTime',
          formatter: (row, column, cellValue, index) => {
            return row.createTime.slice(0, 10)
          }
        },
        {
          label: '操作',
          prop: 'operate',
          type: 'slot',
          width: '100px'
        }
      ],
      query: {
        merchantId: this.merchantId
      }
    }
  },
  async activated () {
    this.getData()
  },
  methods: {
    async deletes () {
      if (!selectionDatas.length) {
        return this.$message({
          type: 'warning',
          message: '请选择账户'
        })
      }
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deleteMerchantAccountById(selectionDatas.map(item => item.id))
        this.$handleRequestTip(res)
        this.getData()
      }).catch(() => {})
    },
    async getData () {
      let res = await getMerchantAccountList({
        ...this.query
      })
      if (res.code === 200) {
        this.tableData = res.data ? res.data : []
      }
    },
    add () {
      this.$emit('updateComp', 'infoDetail', { accountId: '' })
    },
    edit (row) {
      this.$emit('updateComp', 'infoDetail', { accountId: row.id })
    },
    selectChange (selection) {
      selectionDatas = selection
    }
  }
}
</script>

<style lang="scss" module>

</style>
