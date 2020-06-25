<template>
    <div class="product_category">
      <el-row>
        <el-col :span="4">
          <!-- <el-button type="primary" @click="create">新建</el-button> -->
        </el-col>
        <el-col :span="20">
          <el-form :form="query" label-width="120px">
            <el-col :span="11">
              <el-form-item label="项目标识">
                <el-select v-model="query.fdProjectKey" @change="changeProject" filterable remote  placeholder="请选择">
                  <el-option v-for="item in projectOptions" :key="item.id" :label="item.fdName" :value="item.fdKey"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="应用标识">
                <el-input v-model="query.fdAppKey" placeholder="请输入应用标识"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" class="text-right">
              <el-button  type="primary" @click="getData">查询</el-button>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <m-table :data="tableData" :columns="columns"
       row-key="fdKey"
       :load="load"
       lazy
       :showOperation="false"
       @handlePagination="handlePagination"
       :currentPage="currentPage" :pageSize="pageSize" :total="total">
          <template v-slot:col-operate="{scope}">
            <el-button type="primary" :disabled="scope.row.fdParentId === -1" @click="operationHandler(scope.row, scope.$index, 'add')" size="mini">新增</el-button>
            <el-button :disabled="scope.row.fdParentId === -1" @click="operationHandler(scope.row, scope.$index, 'edit')" size="mini">编辑</el-button>
            <el-button @click="operationHandler(scope.row, scope.$index, 'delete')" size="mini">删除</el-button>
          </template>
      </m-table>
    </div>
</template>
<script>
import pagination from '@/mixins/pagination'
import { getResourceByPage, getResourceAppByPage, getAllProject, deleteResourceById } from '@/service/service'
const formPath = '/h/resource_detail'
export default {
  mixins: [pagination],
  data () {
    return {
      tableData: [],
      columns: [
        {
          label: '资源名称',
          prop: 'fdName'
        },
        {
          label: '资源标识',
          prop: 'fdKey'
        },
        {
          label: '路径',
          prop: 'fdPath'
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
        fdParentId: '',
        fdAppKey: '',
        fdProjectKey: ''
      },
      projectOptions: []
    }
  },
  async created () {
    await this.getProject()
    this.getData()
  },
  methods: {
    async getProject (name) {
      let res = await getAllProject()
      if (res.code === 200) {
        this.projectOptions = (res.data ? res.data : [])
        this.query.fdProjectKey = this.projectOptions[0].fdKey
      }
      return this.projectOptions
    },
    changeProject () {
    },
    create () {
      this.$router.push({ path: formPath })
    },
    async delete (row) {
      this.$confirm('是否删除该数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deleteResourceById({ id: row.id })
        this.$handleRequestTip(res)
        this.getData()
      }).catch(() => {})
    },
    add (row) {
      this.$router.push({ path: formPath,
        query: {
          fdParentId: row.id,
          fdProjectKey: row.fdProjectKey,
          fdAppKey: row.fdAppKey
        }
      })
    },
    edit (row) {
      this.$router.push({ path: formPath,
        query: {
          id: row.id,
          edit: 1
        }
      })
    },
    async getData () {
      let res = await getResourceAppByPage({
        ...this.query,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      if (res.code === 200) {
        this.tableData = res.data ? res.data.records : []
        this.total = res.data.total || 0
      }
    },
    load (tree, treeNode, resolve) {
      getResourceByPage({ fdAppKey: tree.fdAppKey, fdProjectKey: tree.fdProjectKey, fdParentId: tree.id }).then((res) => {
        resolve(res.data || [])
      })
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" module>

</style>
