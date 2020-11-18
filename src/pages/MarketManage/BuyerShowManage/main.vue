<template>
    <div class="order_manage">
      <el-row >
        <el-col :span="24">
          <el-form :form="query" label-width="120px">
            <el-col :span="8">
              <el-form-item label="省份">
                <el-input v-model="query.province"  placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="城市">
                <el-input v-model="query.city"  placeholder="请输入"></el-input>
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
      <m-table :data="tableData" :columns="columns"
        ref="table"
       :showOperation="false"
       @handlePagination="handlePagination"
       :currentPage="currentPage" :pageSize="pageSize" :total="total">
        <template v-slot:col-mainPictureUrl="{scope}">
          <img :class="$style.img" :src="scope.row.mainPictureUrl" alt="">
        </template>
        <template v-slot:col-operate="{scope}">
          <el-button  type="primary" @click="operationHandler(scope.row, scope.$index, 'approval')" size="mini">审核</el-button>
          <el-button  type="primary" @click="operationHandler(scope.row, scope.$index, 'detail')" size="mini">明细</el-button>
        </template>
      </m-table>
      <approval-dialog :id="id" @success="success" ref="approvalDialog"></approval-dialog>
    </div>
</template>
<script>
import { getBuyerShowByPage } from '@/service/service.js'
import pagination from '@/mixins/pagination'
import approvalDialog from './approvalDialog'
const formPath = '/h/buyer_show_detail'
const auditStatusOptions = [{value: '0',label:'未审核'},{value: '1',label:'审核通过'},{value: '2',label:'审核不通过'}]
export default {
  mixins: [pagination],
  components: {
    approvalDialog
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
          label: '用户昵称',
          prop: 'nickName',
        },
        {
          label: '描述',
          prop: 'fdContent',
        },
        {
          label: '主图',
          prop: 'mainPictureUrl',
          type: 'slot'
        },
        {
          label: '省份',
          prop: 'province'
        },
        {
          label: '城市',
          prop: 'city'
        },
        {
          label: '点赞数',
          prop: 'totalPoint'
        },
        {
          label: '审核状态',
          prop: 'auditStatus',
          formatter:row =>  (auditStatusOptions.find(s => `${s.value}` === `${row.auditStatus}`) || {} ).label
        },
        {
          label: '发布时间',
          prop: 'createTime'
        },
        {
          label: '操作',
          prop: 'operate',
          type: 'slot',
          width: '150px'
        }
      ],
      query: {
        province: '',
        city: ''
      },
      id: ''
    }
  },
  methods: {
    getSelection () {
      return this.$refs.table.getSelection()
    },
    async getData () {
      let res = await getBuyerShowByPage({
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
    },
    detail(row) {
      this.$router.push({ path: formPath, query: { id: row.id} })
    },
    approval(row) {
      this.id = row.id;
      this.$refs.approvalDialog.open()
    },
    success(){
      this.getData()
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="scss" module>
  .img {
    width: 60px;
  }
</style>
