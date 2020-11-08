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
              <el-form-item label="订单成交时间">
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
              <el-form-item label="收件人名称">
                <el-input v-model="query.receiver"  placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收件人手机号">
                <el-input v-model="query.receiverMobile"  placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品名称">
                <el-input v-model="query.productName"  placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="快递单号">
                <el-input v-model="query.deliverNo"  placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <el-row class="mb-10">
        <el-col :span="4" >
          <el-button type="primary" @click="getData">查询</el-button>
          <el-button type="primary" @click="getInDeliverNo">录入快递单号</el-button>
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
                <div :class="$style.productSku">{{scope.row.productSkuItemInfo}}</div>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:col-operate="{scope}">
          <el-button  type="primary" @click="operationHandler(scope.row, scope.$index, 'detail')" size="mini">详情</el-button>
          <el-button  type="primary" @click="operationHandler(scope.row, scope.$index, 'deliver')" size="mini">立即发货</el-button>
        </template>
      </m-table>
      <el-dialog title="录入快递单号" :visible.sync="visible" width="40%">
      <el-form :model="form" label-width="100px">
        <el-form-item label="物流单号">
          <el-input type="text" v-model="form.deliverNo" placeholder="请输入" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input type="text" v-model="form.orderNo" disabled placeholder="请输入" autocomplete="off"></el-input>
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
import { getDeliverGoods, deliverGoods } from '@/service/service.js'
import pagination from '@/mixins/pagination'
const formPath = '/h/logistics_detail'
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
          width: '500px'
        },
        {
          label: '收货人名称',
          prop: 'receiver',
        },
        {
          label: '收货人手机号',
          prop: 'mobileNo'
        },
        {
          label: '收货人地址',
          prop: 'detailAddress'
        },
        {
          label: '快递单号',
          prop: 'deliverNo',
        },
        {
          label: '发货时间',
          prop: 'deliverTime',
        },
        {
          label: '是否提醒发货',
          prop: 'noticeDeliver',
          formatter: row => row.noticeDeliver ? '是': '否'
        },
        {
          label: '操作',
          prop: 'operate',
          type: 'slot',
          width: '200px'
        }
      ],
      query: {
        payFinishStartTime: '',
        payFinishEndTime: '',
        productName: '',
        buyerName: '',
        deliverStatus: '0',
        deliverNo: '',
        receiver: '',
        receiverMobile: ''
      },
      tabs: [{name: '0',label: '待发货的订单'},{name:'1',label: '已发货的订单'}],
      form: {
        orderNo: '',
        deliverNo: ''
      },
      visible: false,
      current:{}
    }
  },
  methods: {
    getSelection () {
      return this.$refs.table.getSelection()
    },
    async getData () {
      let res = await getDeliverGoods({
        ...this.query,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      if (res.code === 200) {
        this.tableData = (res.data ? res.data.records : []).map(item => {
          const skuInfo = JSON.parse(item.productSkuItemInfo);
          item.productSkuItemInfo = Object.keys(skuInfo).map(key => {
            return `${key}:${skuInfo[key]}`
          }).join('，');
          return item;
        })
        this.total = res.data.total || 0
      }
    },
    getInDeliverNo () {
      // this.visible = true;
    },
    async save () {
      const res = await deliverGoods({
        ...this.form,
        needPayOrderToDeliver: false
      })
      this.$handleRequestTip(res)
      if(res.code === 200) {
        this.visible = false;
        this.getData()
      }
    },
    tabClick() {
      this.getData()
    },
    detail(row) {
      this.$router.push({ path: formPath, query: { orderNo: row.orderNo} })
    },
    deliver(row){
      this.form.orderNo = row.orderNo
      this.visible = true;
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
