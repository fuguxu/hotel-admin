<template>
    <div class="order_manage">
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
       <template v-slot:col-productName="{scope}">
          <div :class="$style['order-content']">
            <div :class="$style['order-header']">
              <span :class="$style.orderNo">订单编号:{{scope.row.orderNo}}</span>  <span>成交时间: {{scope.row.createTime}}</span>
            </div>
            <div :class="$style.content">
              <img :class="$style.img" :src="scope.row.mainPictureUrl" alt="">
              <div :class="$style.right">
                <div :class="$style.product">{{scope.row.productName}}</div>
                <div :class="$style.product">{{scope.row.productProfile}}</div>
                <div :class="$style.productSku">{{scope.row.productSkuInfo}}</div>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:col-operate="{scope}">
          <el-button  type="primary" @click="operationHandler(scope.row, scope.$index, 'detail')" size="mini">详情</el-button>
        </template>
      </m-table>
    </div>
</template>
<script>
import { getOrderListByPage } from '@/service/service.js'
import { orderStatus } from '../config.json'
import pagination from '@/mixins/pagination'
import { accDiv } from '@/util/main'
const formPath = '/h/order_detail'
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
          prop: 'productName',
          type: 'slot',
          width: '510px'
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
          formatter: row => this.tabs.find(tab => tab.name === `${row.orderStatus}`).label
        },
        {
          label: '实收款',
          prop: 'realTotalMoney',
          formatter: row => accDiv(row.realTotalMoney, 1000)
        },
        {
          label: '评价',
          prop: 'totalityScore',
          formatter: row => `${row.totalityScore}分`
        },
        {
          label: '操作',
          prop: 'operate',
          type: 'slot'
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
      tabs: orderStatus
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
        this.tableData = (res.data ? res.data.records : []).map(item => {
          const skuInfo = JSON.parse(item.productSkuInfo);
          item.productSkuInfo = Object.keys(skuInfo).map(key => {
            return `${key}:${skuInfo[key]}`
          }).join('，');
          return item;
        })
        this.total = res.data.total || 0
      }
    },
    tabClick() {
      this.getData()
    },
    detail(row) {
      this.$router.push({ path: formPath, query: { orderNo: row.orderNo} })
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="scss" module>
  .order-content {
    .order-header {
      background: #80808017;
      padding: 10px 5px;
      .orderNo {
        margin-right: 20px;
      }
    }
    .content {
      display: flex;
      padding: 5px 0px;
      .img {
        width:80px;
      }
      .right {
        padding-left: 10px;
        .product {
          line-height: 16px;
        }
        .productSku {
          color:#80808090;
          margin-top:10px;
        }
      }
    }
  }
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
