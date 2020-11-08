<template>
    <div class="order_manage">
      <el-row v-if="!onlyShow">
        <el-col :span="24">
          <el-form :form="query" label-width="120px">
            <el-col :span="8">
              <el-form-item label="商品id">
                <el-input v-model="query.productId"  placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="订单编号">
                <el-input v-model="query.orderNo"  placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="买家昵称">
                <el-input v-model="query.buyerName"  placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="订单起止">
                <el-col :span="11">
                  <el-date-picker
                    v-model="query.appraiseStartTime"
                    type="date"
                    placeholder="开始时间">
                  </el-date-picker>
                </el-col>
                <el-col :class="$style.blank" :span="2"></el-col>
                <el-col :span="11">
                  <el-date-picker
                    v-model="query.appraiseEndTime"
                    type="date"
                    placeholder="结束时间">
                  </el-date-picker>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="!onlyShow">
              <el-form-item label="评价类型">
                <el-select v-model="query.fdType"  clearable placeholder="请选择">
                  <el-option v-for="item in evaluationType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <el-row class="mb-10" v-if="!onlyShow">
        <el-col :span="4" >
          <el-button type="primary" @click="getData">查询</el-button>
        </el-col>
      </el-row>
      <m-table :data="tableData" :columns="columns"
        ref="table"
       :showOperation="false"
       @handlePagination="handlePagination"
       :currentPage="currentPage" :pageSize="pageSize" :total="total">
       <template v-slot:col-orderInfo="{scope}">
          <div :class="$style['order-content']">
            <div :class="$style['order-header']">
              <span :class="$style.orderNo">订单编号:{{scope.row.orderInfo.orderNo}}</span>  <span>成交时间: {{scope.row.orderInfo.createTime}}</span>
            </div>
            <div :class="$style.content">
              <img :class="$style.img" :src="scope.row.orderInfo.mainPictureUrl" alt="">
              <div :class="$style.right">
                <div :class="$style.product">{{scope.row.orderInfo.productName}}</div>
                <div :class="$style.product">{{scope.row.orderInfo.productProfile}}</div>
                <div :class="$style.productSku">{{scope.row.orderInfo.productSkuInfo}}</div>
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
import { getOrderAppraiseByPage } from '@/service/service.js'
import { evaluationType } from '../config.json'
import pagination from '@/mixins/pagination'
const formPath = '/h/evaluation_detail'
export default {
  mixins: [pagination],
  props: {
    onlyShow:{
      type: Boolean,
      default: false
    },
    orderNo:''
  },
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
          prop: 'orderInfo',
          width: '510px',
          type: 'slot'
        },
        {
          label: '评价类型',
          prop: 'fdType',
          formatter: row => (evaluationType.find(tab => tab.value === `${row.fdType}`) || {}).label
        },
        {
          label: '总评分',
          prop: 'totalityScore',
        },
        {
          label: '评价内容',
          prop: 'appraiseMsg'
        },
        {
          label: '评价时间',
          prop: 'createTime'
        },
        {
          label: '操作',
          prop: 'operate',
          type: 'slot'
        }
      ],
      query: {
        productId: '',
        appraiseStartTime: '',
        appraiseEndTime: '',
        buyerName: '',
        orderNo: this.orderNo,
        fdType: ''
      },
      evaluationType: evaluationType
    }
  },
  methods: {
    getSelection () {
      return this.$refs.table.getSelection()
    },
    async getData () {
      let res = await getOrderAppraiseByPage({
        ...this.query,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      if (res.code === 200) {
        this.tableData = (res.data ? res.data.records : []).map(item => {
          const skuInfo = JSON.parse(item.orderInfo.productSkuInfo);
          item.orderInfo.productSkuInfo = Object.keys(skuInfo).map(key => {
            return `${key}:${skuInfo[key]}`
          }).join('，');
           return item
        })
        this.total = res.data.total || 0
      }
    },
    tabClick() {
      this.getData()
    },
    detail(row) {
      this.$router.push({ path: formPath, query: { id: row.id} })
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
