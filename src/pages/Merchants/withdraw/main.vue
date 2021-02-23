<template>
    <div class="product_category">
      <el-row class="mb-10">
        <el-col :span="4">
          <!-- <el-button  type="primary" @click="create">新建</el-button> -->
        </el-col>
        <el-col :span="20">
          <el-form :form="query" label-width="120px">
            <el-col :span="11">
              <el-form-item label="账户名">
                <el-input v-model="query.accountName"  placeholder="请输入账户名"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="11">
              <el-form-item label="账户号">
                <el-input v-model="query.accountNo"  placeholder="请输入账户号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="提现申请号">
                <el-input v-model="query.withdrawNo"  placeholder="请输入提现申请号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="状态">
                <el-select v-model="query.status" clearable>
                  <el-option v-for="item in statusOptions" v-bind="item" :key="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="text-right" :span="2">
              <el-button  type="primary" @click="getData">查询</el-button>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <m-table :data="tableData" :columns="columns"
       :showOperation="false"
       @operationHandler="operationHandler"
       @selection-change="selectChange"
       @handlePagination="handlePagination"
       :currentPage="currentPage" :pageSize="pageSize" :total="total">
          <!-- <template v-slot:col-operate="{scope}"> -->
            <!-- <el-button type="primary" @click="operationHandler(scope.row, scope.$index, 'edit')" size="mini">审核</el-button> -->
            <!-- <el-button type="primary" @click="operationHandler(scope.row, scope.$index, 'detail')" size="mini">明细</el-button> -->
          <!-- </template> -->
      </m-table>
    </div>
</template>
<script>
import pagination from '@/mixins/pagination'
import { getMerchantWithdrawRecordByPage } from '@/service/service'
let selectionDatas = []
const formPath = '/h/merchant_detail'
export default {
  mixins: [pagination],
  data () {
    return {
      tableData: [],
      columns: [
        {
          type: 'selection'
        },
        {
          label: '提现申请号',
          prop: 'withdrawNo'
        },
        {
          label: '账户名',
          prop: 'accountName'
        },
        {
          label: '账户号',
          prop: 'accountNo'
        },
        {
          label: '提现金额',
          prop: 'withdrawMoney'
        },
        {
          label: '联系方式',
          prop: 'mobileNo'
        },
        {
          label: '账户类型',
          prop: 'accountType',
          formatter: (row, column, cellValue, index) => {
            return (this.accountTypeOptions.find(item => `${item.value}` === `${row.accountType}`) || {}).label
          }
        },
        {
          label: '状态',
          prop: 'status',
          formatter: (row, column, cellValue, index) => {
            return (this.statusOptions.find(item => `${item.value}` === `${row.status}`) || {}).label
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
        accountName: '',
        accountNo: '',
        withdrawNo: '',
        status: ''
      },
      statusOptions:[
        {
          label: '待审核',
          value: 0
        },
        {
          label: '处理中',
          value: 1
        },
        {
          label: '处理失败',
          value: 2
        },
        {
          label: '处理成功',
          value: 3
        }
      ],
      //0-微信；1-支付宝；2-银行卡
      accountTypeOptions: [
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
    }
  },
  async created () {
    this.getData()
  },
  methods: {
    // create () {
    //   this.$router.push({ path: formPath })
    // },
    async getData () {
      let res = await getMerchantWithdrawRecordByPage({
        ...this.query,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      if (res.code === 200) {
        this.tableData = res.data ? res.data.records : []
        this.total = res.data.total || 0
      }
    },
    selectChange (selection) {
      selectionDatas = selection
    },
    detail (row) {
      this.$router.push({ path: formPath, query: { id: row.id, edit: 1 } })
    }
  },
  components: {
  }
}
</script>

<style lang="scss" module>

</style>
