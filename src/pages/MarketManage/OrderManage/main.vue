<template>
    <div class="product_category">
      <el-row >
        <el-col :span="24">
          <el-form :form="query" label-width="120px">
            <el-col :span="8">
              <el-form-item label="商品id">
                <el-input v-model="query.productId"  placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="成交时间">
                <el-col :span="11">
                  <el-date-picker
                    v-model="query.payFinishStartTime"
                    type="date"
                    placeholder="开始时间">
                  </el-date-picker>
                </el-col>
                <el-col :class="$style.blank" :span="2"></el-col>
                <el-col :span="11">
                  <el-date-picker
                    v-model="query.payFinishEndTime"
                    type="date"
                    placeholder="结束时间">
                  </el-date-picker>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品名称">
                <el-input v-model="query.productName"  placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="买家昵称">
                <el-input v-model="query.buyerName"  placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="订单编号">
                <el-input v-model="query.orderNo"  placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <el-row class="mb-10">
        <el-col :span="4" >
          <el-button type="primary" @click="getData">查询</el-button>
        </el-col>
      </el-row>
      <el-tabs class="mb-10" type="border-card" v-model="query.orderStatus" @tab-click="tabClick">
        <el-tab-pane v-for="item in tabs" :key="item.name" v-bind="item"></el-tab-pane>
      </el-tabs>
      <m-table :data="tableData" :columns="columns"
        ref="table"
       :showOperation="false"
       @handlePagination="handlePagination"
       :currentPage="currentPage" :pageSize="pageSize" :total="total">
        <template v-slot:col-operate="{scope}">

        </template>
      </m-table>
    </div>
</template>
<script>
import { getOrderListByPage } from '@/service/service.js'
import pagination from '@/mixins/pagination'
import { accDiv } from '@/util/main'
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
          label: '商品',
          prop: 'productName'
        },
        {
          label: '单价',
          prop: 'productPrice',
          formatter: row => accDiv(row.productPrice, 1000)
        },
        {
          label: '数量',
          prop: 'productCount'
        },
        {
          label: '买家',
          prop: 'buyerName'
        },
        {
          label: '交易状态',
          prop: 'orderStatus',
        },
        {
          label: '实收款',
          prop: 'realTotalMoney',
          formatter: row => accDiv(row.realTotalMoney, 1000)
        },
        {
          label: '评价',
          prop: 'buyerName'
        }
      ],
      query: {
        productId: '',
        payFinishStartTime: '',
        payFinishEndTime: '',
        productName: '',
        buyerName: '',
        orderStatus: '10',
        orderNo: ''
      },
      tabs: [
        // {
        //   label: '近三个月订单'
        // },
        {
          label: '待买家付款',
          name: '10'
        },
        {
          label: '待发货',
          name: '20'
        },
        {
          label: '已发货',
          name: '30'
        },
        {
          label: '待评价',
          name: '40'
        },
        {
          label: '成功的订单',
          name: '60'
        },
        {
          label: '关闭的订单',
          name: '50'
        },
        // {
        //   label: '三个月前的订单',
        //   name: '10'
        // }
      ]
    }
  },
  methods: {
    getSelection () {
      return this.$refs.table.getSelection()
    },
    async getData () {
      let res = await getOrderListByPage({
        ...this.query,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      if (res.code === 200) {
        this.tableData = (res.data ? res.data.records : [])
        this.total = res.data.total || 0
      }
    },
    tabClick() {
      this.getData()
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="scss" module>
  .blank {
    height:1px;
  }
</style>
<style  scoped>
.el-tabs--border-card{
    border-bottom: none;
    border-left: none;
    border-right: none;
    box-shadow: none;
  }
  .el-tabs--border-card >>> .el-tabs__content{
    display: none;
  }
</style>
