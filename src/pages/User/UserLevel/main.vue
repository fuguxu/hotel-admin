<template>
    <div class="user_level">
      <el-row class="mb-10">
        <el-form :form="query" label-width="120px">
          <el-col :span="6">
            <el-form-item label="等级名称">
              <el-input v-model="query.levelName"  placeholder="请输入等级名称"></el-input>
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
         <template v-slot:col-levleIcon="{scope}">
             <img :class="$style.levleIcon" :src="scope.row.levleIcon" alt="">
          </template>
      </m-table>
    </div>
</template>
<script>
import { getUserLevel, deleteUserLevel } from '@/service/service.js'
import pagination from '@/mixins/pagination'
const formPath = '/h/user_level_detail'
export default {
  mixins: [pagination],
  data () {
    return {
      tableData: [],
      columns: [
        {
          label: '等级编码',
          prop: 'levleCode'
        },
        {
          label: '等级名称',
          prop: 'levleName'
        },
        {
          label: '开始积分',
          prop: 'startScore'
        },
        {
          label: '结束积分',
          prop: 'endScore'
        },
        {
          label: '积分比例',
          prop: 'addScoreRatio'
        },
        {
          label: '积分折扣',
          prop: 'discount'
        },
        {
          label: '等级图标',
          prop: 'levleIcon',
          type: 'slot'
        }
      ],
      query: {
        levelName: ''
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
        let res = await deleteUserLevel({ id: row.id })
        this.$handleRequestTip(res)
        res.code === 200 && this.getData()
      }).catch(() => {})
    },
    edit (row) {
      this.$router.push({ path: formPath, query: { id: row.id, edit: 1 } })
    },
    async getData () {
      let res = await getUserLevel({
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
  .levleIcon{
    width:30px;
  }
</style>
