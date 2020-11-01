<template>
    <div class="order_manage">
      <el-row >
        <el-col :span="24">
          <el-form :form="query" label-width="120px">
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
            <el-col :span="8">
              <el-form-item label="售后申请编号">
                <el-input v-model="query.orderNo"  placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="运单号">
                <el-input v-model="query.deliverNo"  placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最近修改时间">
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
              <el-form-item label="退款金额">
                <el-col :span="11">
                  <el-input v-model="query.deliverNo"  placeholder="请输入"></el-input>
                </el-col>
                <el-col :class="$style.blank" :span="2">至</el-col>
                <el-col :span="11">
                  <el-input v-model="query.deliverNo"  placeholder="请输入"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="原因">
                <el-input v-model="query.receiver"  placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="退货物流状态">
                <el-input v-model="query.receiverMobile"  placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="退款状态">
                <el-input v-model="query.productName"  placeholder="请输入"></el-input>
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
      <el-tabs class="mb-10" type="border-card" v-model="query.deliverStatus" @tab-click="tabClick">
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
      <el-dialog title="录入快递单号" :visible.sync="visible" width="40%">
      <el-form :model="form" label-width="100px">
        <el-form-item label="物流单号">
          <el-input type="text" v-model="form.deliverNo" placeholder="请输入" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input type="text" v-model="form.orderNo" placeholder="请输入" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </div>
    </el-dialog>
    </div>
</template>
<script>
import { getReturnsApply } from '@/service/service.js'
import pagination from '@/mixins/pagination'
import { accDiv } from '@/util/main'
const formPath = '/h/after_sale_detail'
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
          width: '400px'
        },
        {
          label: '交易金额',
          prop: 'receiver',
        },
        {
          label: '退款金额',
          prop: 'receiverMobile'
        },
        {
          label: '最近申请时间',
          prop: 'buyerName'
        },
        {
          label: '原因',
          prop: 'deliverNo',
        },
        {
          label: '退货物流',
          prop: 'realTotalMoney',
        },
        {
          label: '发货物流',
          prop: 'buyerName'
        },
        {
          label: '退款状态',
          prop: 'buyerName'
        },
        {
          label: '操作',
          prop: 'operate',
          type: 'slot'
        }
      ],
      query: {
        payFinishStartTime: '',
        payFinishEndTime: '',
        productName: '',
        buyerName: '',
        deliverStatus: '20',
        deliverNo: '',
        receiver: '',
        receiverMobile: '',
        orderNo: ''
      },
      tabs: [{name: 'all',label: '全部订单'},{name: '20',label: '仅款退'},{name:'30',label: '退款'}],
      form: {
        orderNo: '',
        deliverNo: ''
      },
      visible: false
    }
  },
  methods: {
    getSelection () {
      return this.$refs.table.getSelection()
    },
    async getData () {
      let res = await getReturnsApply({
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
    getInDeliverNo () {
      this.visible = true;
    },
    save () {

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
