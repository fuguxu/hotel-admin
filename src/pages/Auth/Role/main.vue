<template>
    <div class="product_category">
      <el-row >
        <el-col :span="4">
          <el-button type="primary" @click="create">新建</el-button>
        </el-col>
        <el-col :span="20">
          <el-form :form="query" label-width="120px">
            <el-col :span="7">
              <el-form-item label="角色名称">
                <el-input v-model="query.roleName"  placeholder="请输入角色名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="角色标识">
                <el-input v-model="query.roleKey"  placeholder="请输入角色标识"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="所属项目">
                <el-select v-model="query.projectKey" filterable remote clearable  placeholder="请选择">
                  <el-option v-for="item in projectOptions" :key="item.id" :label="item.fdName" :value="item.fdKey"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3" class="text-right">
              <el-button type="primary" @click="getData">查询</el-button>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <m-table :data="tableData" :columns="columns"
       :showOperation="false"
       @operationHandler="operationHandler"
       @handlePagination="handlePagination"
       :currentPage="currentPage" :pageSize="pageSize" :total="total">
          <template v-slot:col-operate="{scope}">
            <el-button type="primary"  @click="operationHandler(scope.row, scope.$index, 'auth')" size="mini">授权</el-button>
            <!-- <el-button type="primary"  @click="operationHandler(scope.row, scope.$index, 'detail')" size="mini">详情</el-button> -->
            <el-button  @click="operationHandler(scope.row, scope.$index, 'edit')" size="mini">编辑</el-button>
            <el-button type="danger" @click="operationHandler(scope.row, scope.$index, 'delete')" size="mini">删除</el-button>
          </template>
      </m-table>
    </div>
</template>
<script>
import { getRoleByPage, deleteRoleById, getAllProject } from '@/service/service.js'
import pagination from '@/mixins/pagination'
const formPath = '/h/role_detail'
export default {
  mixins: [pagination],
  data () {
    return {
      tableData: [],
      columns: [
        {
          label: '角色名称',
          prop: 'fdName'
        },
        {
          label: '角色标识',
          prop: 'fdKey'
        },
        {
          label: '是否有效',
          prop: 'fdIsAvailable',
          formatter: (row, column, cellValue, index) => {
            return row.fdIsAvailable ? '是' : '否'
          }
        },
        {
          label: '描述',
          prop: 'fdDescription'
        },
        {
          label: '操作',
          prop: 'operate',
          width: '220px',
          type: 'slot'
        }
      ],
      query: {
        roleName: '',
        roleKey: '',
        projectKey: ''
      },
      projectOptions: []
    }
  },
  methods: {
    async getProject (name) {
      let res = await getAllProject()
      if (res.code === 200) {
        this.projectOptions = (res.data ? res.data : [])
        this.query.projectKey = this.projectOptions[0].fdKey
      }
      return this.projectOptions
    },
    create () {
      this.$router.push({ path: formPath })
    },
    detail (row) {
      this.$router.push({ path: formPath, query: { id: row.id } })
    },
    auth (row) {
      this.$router.push({ path: '/h/role_auth', query: { roleId: row.id, edit: 1, projectKey: row.projectKey } })
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
        let res = await deleteRoleById({ id: row.id })
        this.$handleRequestTip(res)
        res.code === 200 && this.getData()
      }).catch(() => {})
    },
    edit (row) {
      this.$router.push({ path: formPath, query: { id: row.id, edit: 1 } })
    },
    async getData () {
      let res = await getRoleByPage({
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
  async created () {
    await this.getProject()
    this.getData()
  }
}
</script>

<style lang="scss" module>
  .brandLogo{
    width:55px;
  }
</style>
